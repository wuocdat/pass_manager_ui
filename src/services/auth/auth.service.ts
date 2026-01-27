import ApiService from "@/services/ApiService";
import {SignInResponse, MeResponse} from "@/@types/auth";
import type { UserKeyPayload } from '@/utils/crypto'

export const AuthService = {
  async signIn(email: string, password: string): Promise<SignInResponse> {
    const res = await ApiService.fetchData<{ email: string, password: string }, SignInResponse>({
      url: '/auth/login',
      method: 'POST',
      data: {email, password}
    })
    return res.data;
  },
  async getMe(): Promise<MeResponse> {
    const res = await ApiService.fetchData<undefined, MeResponse>({
      url: '/auth/me',
      method: 'GET',
    })
    return res.data
  },
  async changePassword(password: string, userKey: UserKeyPayload): Promise<{ updated: boolean }> {
    const res = await ApiService.fetchData<{ password: string; userKey: UserKeyPayload }, { updated: boolean }>({
      url: '/auth/change-password',
      method: 'POST',
      data: { password, userKey }
    })
    return res.data
  },
}
