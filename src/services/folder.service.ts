import ApiService from '@/services/ApiService'
import type { CreateFolderPayload, Folder } from '@/@types/folder'

export const FolderService = {
  async getFolders(): Promise<Folder[]> {
    const res = await ApiService.fetchData<undefined, Folder[]>({
      url: '/folders',
      method: 'GET',
    })
    return res.data
  },
  async createFolder(payload: CreateFolderPayload): Promise<Folder> {
    const res = await ApiService.fetchData<CreateFolderPayload, Folder>({
      url: '/folders',
      method: 'POST',
      data: payload,
    })
    return res.data
  },
  async deleteFolder(id: string): Promise<void> {
    await ApiService.fetchData<undefined, void>({
      url: `/folders/${id}`,
      method: 'DELETE',
    })
  },
}
