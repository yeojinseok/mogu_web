import { axiosInstance } from '@/axios/axiosInstance'
import axios from 'axios'
import NextAuth from 'next-auth'
import type { AuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import jwt_decode from 'jwt-decode'

import CredentialsProvider from 'next-auth/providers/credentials'
import { getAccessToken } from '@/utils/getRefreshToken'

const REFRESH_THRESHOLD = 600 // access token 만료 시간을 얼마나 남겨둘지 결정하는 값(단위: 초)

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token, user }) {
      if (token) {
        //@ts-ignore
        session.accessToken = token.accessToken
        //@ts-ignore
        session.refreshToken = token.refreshToken
        //@ts-ignore
        session.id = token.id
      }

      return session
    },
    async jwt({ token, user }) {
      if (user) {
        //@ts-ignore
        token.accessToken = user.accessToken
        //@ts-ignore
        token.refreshToken = user.refreshToken
        token.id = user.id
      }

      const now = Date.now() / 1000

      //@ts-ignore
      const expirationTime = jwt_decode(token?.accessToken as string).exp

      if (expirationTime - now < REFRESH_THRESHOLD) {
        //@ts-ignore
        const accessToken = await getAccessToken(token?.refreshToken as string)
        token.accessToken = accessToken
      }

      return token
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (typeof credentials !== 'undefined') {
          const res = await axiosInstance
            .post('/shops/users/sign-in', credentials)
            .then(v => v.data)

          if (typeof res !== 'undefined') {
            return { ...res, name: 'gdgd' }
          } else {
            return null
          }
        } else {
          return null
        }
      },
    }),
  ],
  session: { strategy: 'jwt' },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
