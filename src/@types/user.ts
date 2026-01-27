export type UserItem = {
  id: string
  email: string
  fullName: string
  role: string
}

export type CreateUserPayload = {
  email: string
  password: string
  fullName: string
}
