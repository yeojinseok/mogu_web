import axios, { isAxiosError } from 'axios'
import NextAuth from 'next-auth'
import type { AuthOptions } from 'next-auth'
import jwt_decode from 'jwt-decode'

import CredentialsProvider from 'next-auth/providers/credentials'
import { getAccessToken } from '@/utils/getRefreshToken'
import { authRoute } from '@/router/auth'

const REFRESH_THRESHOLD = 600 // access token 만료 시간을 얼마나 남겨둘지 결정하는 값(단위: 초)

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: authRoute.signIn,
  },
  callbacks: {
    async session({ session, token, user }) {
      if (token) {
        session.accessToken = token.accessToken
        session.refreshToken = token.refreshToken
        //@ts-ignore
        session.id = token.id
      }

      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken

        token.refreshToken = user.refreshToken
        token.id = user.userID ?? ''
      }

      const now = Date.now() / 1000

      //@ts-ignore
      const expirationTime = jwt_decode(token?.accessToken as string).exp

      if (expirationTime - now < REFRESH_THRESHOLD) {
        const accessToken = await getAccessToken(token?.refreshToken)
        token.accessToken = accessToken
      }

      return token
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { type: 'text' },
        password: { type: 'password' },
        isSignUp: { type: 'text' },
        nickname: { type: 'text' },
      },
      async authorize(credentials, req) {
        if (typeof credentials !== 'undefined') {
          if (!credentials.isSignUp) {
            try {
              const res = await axios
                .post(
                  `${process.env.NEXT_PUBLIC_API}/authentication/login`,
                  { email: credentials.email, password: credentials.password },
                  {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  }
                )
                .then(v => v.data.data)
              return res
            } catch (err) {
              if (isAxiosError(err)) {
                throw new Error(err.response?.data.message)
              }
            }
          } else {
            try {
              return await axios
                .post(
                  `${process.env.NEXT_PUBLIC_API}/authentication/register`,
                  {
                    email: credentials.email,
                    password: credentials.password,
                    nickname: credentials.nickname,
                  }
                )
                .then(v => v.data.data)
            } catch (err) {
              if (isAxiosError(err)) {
                throw new Error(err.response?.data.message)
              }
            }
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
