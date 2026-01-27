import ApiService from '@/services/ApiService'
import type {
  CreatePasswordInput,
  CreatePasswordPayload,
  PasswordItem,
  UpdatePasswordPayload,
} from '@/@types/password'
import { decryptWithMasterKey, encryptWithMasterKey } from '@/utils/crypto'

export const PasswordService = {
  async getPasswords(): Promise<PasswordItem[]> {
    const res = await ApiService.fetchData<undefined, PasswordItem[]>({
      url: '/passwords',
      method: 'GET',
    })
    return res.data
  },
  async getPasswordsByFolder(folderId: string): Promise<PasswordItem[]> {
    const res = await ApiService.fetchData<undefined, PasswordItem[]>({
      url: `/passwords/folder/${folderId}`,
      method: 'GET',
    })
    return res.data
  },
  async deletePassword(id: string): Promise<void> {
    await ApiService.fetchData<undefined, void>({
      url: `/passwords/${id}`,
      method: 'DELETE',
    })
  },
  async createPassword(input: CreatePasswordInput, masterKeyBase64: string): Promise<unknown> {
    const { passwordEncrypted, encryptionMeta } = await encryptWithMasterKey(masterKeyBase64, input.password)
    const payload: CreatePasswordPayload = {
      folderId: input.folderId,
      title: input.title,
      username: input.username,
      passwordEncrypted,
      url: input.url,
      notes: input.notes,
      encryptionMeta,
      isPublic: input.isPublic,
    }
    const res = await ApiService.fetchData<CreatePasswordPayload, unknown>({
      url: '/passwords',
      method: 'POST',
      data: payload,
    })
    return res.data
  },
  async updatePassword(id: string, payload: UpdatePasswordPayload): Promise<PasswordItem> {
    const res = await ApiService.fetchData<UpdatePasswordPayload, PasswordItem>({
      url: `/passwords/${id}`,
      method: 'PATCH',
      data: payload,
    })
    return res.data
  },
  async decryptPassword(
    masterKeyBase64: string,
    passwordEncrypted: string,
    encryptionMeta: PasswordItem['encryptionMeta']
  ): Promise<string> {
    return decryptWithMasterKey(masterKeyBase64, passwordEncrypted, encryptionMeta)
  },
}
