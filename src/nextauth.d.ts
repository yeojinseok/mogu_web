// https://reacthustle.com/blog/extend-user-session-nextauth-typescript#google_vignette

// nextauth.d.ts
import { DefaultSession, DefaultUser } from 'next-auth'

interface IUser extends DefaultUser {}
declare module 'next-auth' {
  interface User extends IUser {
    accessToken?: string
    refreshToken?: string
    userID: string
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
