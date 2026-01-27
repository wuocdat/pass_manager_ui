let masterKey: CryptoKey | null = null

export const VaultService = {
  setMasterKey(key: CryptoKey) {
    masterKey = key
  },
  getMasterKey() {
    return masterKey
  },
  clear() {
    masterKey = null
  },
}
