
export interface LoginRequest {
  userName: string
  password: string
}
export interface LoginResponse {
  tokenType: string
  accessToken: string
  expiresIn: number
  refreshToken: string
}


export type UserInfo = {
  email: string
  isEmailConfirmed: boolean
}