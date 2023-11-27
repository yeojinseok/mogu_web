export type CheckRegisterResponseType = {
  code: number
  status: string
  message: string
  data: {
    isRegistered: boolean
    userStatus: 'ACTIVE' | 'INACTIVE'
  }
}
