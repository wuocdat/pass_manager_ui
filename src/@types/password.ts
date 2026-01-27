import type { EncryptionMeta } from '@/utils/crypto'

export type CreatePasswordInput = {
  folderId?: string
  title: string
  username?: string
  password: string
  url?: string
  notes?: string
  isPublic?: boolean
}

export type CreatePasswordPayload = {
  folderId?: string
  title: string
  username?: string
  passwordEncrypted: string
  url?: string
  notes?: string
  encryptionMeta: EncryptionMeta
  isPublic?: boolean
}

export type UpdatePasswordPayload = {
  title: string
  url?: string
  notes?: string
}

export type PasswordOwner = {
  id: string
  email: string
  fullName: string
  role: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export type PasswordFolder = {
  id: string
  name: string
} | null

export type PasswordItem = {
  id: string
  owner: PasswordOwner
  folder: PasswordFolder
  title: string
  username?: string
  passwordEncrypted: string
  url?: string
  notes?: string
  encryptionMeta: EncryptionMeta
  isPublic?: boolean
  createdAt: string
  updatedAt: string
}
