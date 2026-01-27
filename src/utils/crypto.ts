import { randomBytes } from '@noble/hashes/utils'
import { argon2id } from '@noble/hashes/argon2'

export type KdfParams = {
  algorithm: 'argon2id'
  memory: number
  iterations: number
  parallelism: number
  hashLength: number
}

export type UserKeyPayload = {
  wrappedMasterKey: string
  kdfSalt: string
  kdfParams: KdfParams
  keyVersion: number
}

const encoder = new TextEncoder()
const decoder = new TextDecoder()

const defaultKdfParams: KdfParams = {
  algorithm: 'argon2id',
  memory: 65536,
  iterations: 3,
  parallelism: 1,
  hashLength: 32,
}

function toBase64(buffer: Uint8Array): string {
  let binary = ''
  buffer.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })
  return btoa(binary)
}

function fromBase64(value: string): Uint8Array {
  const binary = atob(value)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

async function importAesKey(rawKey: Uint8Array, usages: KeyUsage[]): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    rawKey,
    'AES-GCM',
    false,
    usages
  )
}

async function aesGcmEncrypt(key: Uint8Array, data: Uint8Array): Promise<Uint8Array> {
  const iv = randomBytes(12)
  const cryptoKey = await importAesKey(key, ['encrypt'])
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    data
  )
  const cipherBytes = new Uint8Array(encrypted)
  const combined = new Uint8Array(iv.length + cipherBytes.length)
  combined.set(iv, 0)
  combined.set(cipherBytes, iv.length)
  return combined
}

async function aesGcmEncryptWithIv(
  key: Uint8Array,
  data: Uint8Array,
  iv: Uint8Array
): Promise<Uint8Array> {
  const cryptoKey = await importAesKey(key, ['encrypt'])
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    data
  )
  return new Uint8Array(encrypted)
}

async function aesGcmDecrypt(key: Uint8Array, payload: Uint8Array): Promise<Uint8Array> {
  const iv = payload.slice(0, 12)
  const cipherBytes = payload.slice(12)
  const cryptoKey = await importAesKey(key, ['decrypt'])
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    cipherBytes
  )
  return new Uint8Array(decrypted)
}

async function aesGcmDecryptWithIv(
  key: Uint8Array,
  cipherWithTag: Uint8Array,
  iv: Uint8Array
): Promise<Uint8Array> {
  const cryptoKey = await importAesKey(key, ['decrypt'])
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    cipherWithTag
  )
  return new Uint8Array(decrypted)
}

export async function buildUserKeyPayload(password: string): Promise<UserKeyPayload> {
  const salt = randomBytes(16)
  const masterKey = randomBytes(32)
  const kdfParams = { ...defaultKdfParams }

  const kek = argon2id(encoder.encode(password), salt, {
    m: kdfParams.memory,
    t: kdfParams.iterations,
    p: kdfParams.parallelism,
    dkLen: kdfParams.hashLength,
  })

  const wrappedMasterKey = await aesGcmEncrypt(kek, masterKey)

  return {
    wrappedMasterKey: toBase64(wrappedMasterKey),
    kdfSalt: toBase64(salt),
    kdfParams,
    keyVersion: 1,
  }
}

export async function unwrapMasterKey(password: string, userKey: UserKeyPayload): Promise<string> {
  const salt = fromBase64(userKey.kdfSalt)
  const kdfParams = userKey.kdfParams
  const kek = argon2id(encoder.encode(password), salt, {
    m: kdfParams.memory,
    t: kdfParams.iterations,
    p: kdfParams.parallelism,
    dkLen: kdfParams.hashLength,
  })
  const wrappedMasterKey = fromBase64(userKey.wrappedMasterKey)
  const masterKey = await aesGcmDecrypt(kek, wrappedMasterKey)
  return toBase64(masterKey)
}

export type EncryptionMeta = {
  algorithm: 'aes-256-gcm'
  iv: string
  tag: string
}

export async function encryptWithMasterKey(
  masterKeyBase64: string,
  plaintext: string
): Promise<{ passwordEncrypted: string; encryptionMeta: EncryptionMeta }> {
  const masterKey = fromBase64(masterKeyBase64)
  const iv = randomBytes(12)
  const plaintextBytes = encoder.encode(plaintext)
  const encrypted = await aesGcmEncryptWithIv(masterKey, plaintextBytes, iv)
  const tagLength = 16
  const tagStart = encrypted.length - tagLength
  const cipherBytes = encrypted.slice(0, tagStart)
  const tagBytes = encrypted.slice(tagStart)
  return {
    passwordEncrypted: toBase64(cipherBytes),
    encryptionMeta: {
      algorithm: 'aes-256-gcm',
      iv: toBase64(iv),
      tag: toBase64(tagBytes),
    },
  }
}

export async function decryptWithMasterKey(
  masterKeyBase64: string,
  passwordEncrypted: string,
  encryptionMeta: EncryptionMeta
): Promise<string> {
  const masterKey = fromBase64(masterKeyBase64)
  const iv = fromBase64(encryptionMeta.iv)
  const cipherBytes = fromBase64(passwordEncrypted)
  const tagBytes = fromBase64(encryptionMeta.tag)
  const cipherWithTag = new Uint8Array(cipherBytes.length + tagBytes.length)
  cipherWithTag.set(cipherBytes, 0)
  cipherWithTag.set(tagBytes, cipherBytes.length)
  const decrypted = await aesGcmDecryptWithIv(masterKey, cipherWithTag, iv)
  return decoder.decode(decrypted)
}
