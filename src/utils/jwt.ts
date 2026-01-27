export type JwtPayload = Record<string, unknown> & {
  exp?: number
  iat?: number
}

function decodeBase64(input: string): string {
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/')
  const padding = normalized.length % 4
  const padded = padding ? normalized + '='.repeat(4 - padding) : normalized

  if (typeof atob === 'function') {
    return atob(padded)
  }

  return Buffer.from(padded, 'base64').toString('binary')
}

export function parseJwt(token?: string | null): JwtPayload | null {
  if (!token) {
    return null
  }

  const parts = token.split('.')
  if (parts.length < 2) {
    return null
  }

  try {
    const payload = decodeBase64(parts[1])
    return JSON.parse(payload) as JwtPayload
  } catch (error) {
    return null
  }
}
