export type SignInCredential = {
  email: string
  password: string
}

export type ForgotPasswordReq = {
  email: string
}

export interface SignInResponse {
  id?: string
  fullName?: string
  authority?: string[]
  phoneNumber?: string
  email?: string
  access_token?: string
  accessToken?: string
  token?: string
  refresh_token?: string
  refreshToken?: string
  expires_in?: number
  expireTime?: number
  must_change_password?: boolean
  user?: {
    id?: string
    fullName?: string
    authority?: string[]
    phoneNumber?: string
    email?: string
    role?: string[] | string
  }
  role?: string[] | string
  user_key?: {
    id?: string
    wrappedMasterKey?: string
    kdfSalt?: string
    kdfParams?: {
      memory?: number
      algorithm?: 'argon2id'
      hashLength?: number
      iterations?: number
      parallelism?: number
    }
    keyVersion?: number
  }
}

export type MeResponse = {
  id: string
  email: string
  role: string
}

export interface ResponseInfoObject {
  status: 'success' | 'failed';
  error_code?: number;
  message?: string;
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
  name: string
  username: string
  password: string
}
