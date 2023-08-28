import { axiosInstance } from '@/axios/axiosInstance'
import NextAuth from 'next-auth'
import type { AuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'

import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token, user }) {
      if (token) {
        console.log('token', token)
        //@ts-ignore
        session.accessToken = token.accessToken
        //@ts-ignore
        session.refreshToken = token.refreshToken
        //@ts-ignore
        session.id = token.id
      }
      console.log('session', session)
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
