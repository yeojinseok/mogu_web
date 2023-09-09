// https://reacthustle.com/blog/extend-user-session-nextauth-typescript#google_vignette

// nextauth.d.ts
import { DefaultSession, DefaultUser } from 'next-auth'
export enum Role {
  user = 'user',
  admin = 'admin',
}
interface IUser extends DefaultUser {
  /**
   * Role of user
   */
  role?: Role
  /**
   * Field to check whether a user has a subscription
   */
  subscribed?: boolean
}
declare module 'next-auth' {
  interface User extends IUser {
    accessToken?: string
    refreshToken?: string
    userID?: string
  }
  interface Session {
    user?: User
    accessToken?: string
    refreshToken?: string
  }
}
declare module 'next-auth/jwt' {
  interface JWT extends IUser {
    accessToken?: string
    refreshToken?: string
  }
}
