import ApiService from '@/services/ApiService'
import type { CreateUserPayload, UserItem } from '@/@types/user'

export const UserService = {
  async getUsers(): Promise<UserItem[]> {
    const res = await ApiService.fetchData<undefined, UserItem[]>({
      url: '/users',
      method: 'GET',
    })
    return res.data
  },
  async createUser(payload: CreateUserPayload): Promise<UserItem> {
    const { email, password, fullName } = payload
    const res = await ApiService.fetchData<CreateUserPayload, UserItem>({
      url: '/users',
      method: 'POST',
      data: { email, password, fullName },
    })
    return res.data
  },
  async deleteUser(id: string): Promise<void> {
    await ApiService.fetchData<undefined, void>({
      url: `/users/${id}`,
      method: 'DELETE',
    })
  },
}
