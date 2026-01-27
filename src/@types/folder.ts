export type FolderOwner = {
  id: string
  email: string
  fullName: string
  role: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export type Folder = {
  id: string
  owner: FolderOwner
  parent: Folder | null
  name: string
  description: string
  isPublic: boolean
  passwordCount?: number
  createdAt: string
  updatedAt: string
}

export type CreateFolderPayload = {
  parentId: string | null
  name: string
  description: string
  isPublic: boolean
}
