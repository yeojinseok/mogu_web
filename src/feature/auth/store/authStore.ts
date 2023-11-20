import { axiosInstance } from '@/axios/axiosInstance'
import axios, { AxiosError } from 'axios'
import { jwtDecode } from 'jwt-decode'
import { redirect } from 'next/navigation'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthStateType = {
  getIsLogin: () => boolean
  accessToken: string | null
  userId: number | null

  signOut: () => void
  signIn: (body: { email: string; password: string }) => Promise<{
    isSuccess: boolean
    err?: AxiosError
    data: {
      accessToken: string
      userId: number
    } | null
  }>
  signUp: (body: {
    email: string
    password: string
    nickname: string
  }) => Promise<{
    isSuccess: boolean
    err?: AxiosError
    data: {
      accessToken: string
      userId: number
    } | null
  }>
  refreshAccessToken: () => Promise<{
    accessToken: string | null
    userId: number | null
  }>
}

export const useAuthStore = create(
  persist<AuthStateType>(
    (set, get) => ({
      accessToken: null,
      userId: null,

      getIsLogin: () => {
        return !!get().userId && !!get().accessToken
      },

      signOut: () => {
        // set({
        //   accessToken: null,
        //   userId: null,
        // })

        axios.post('/api/auth/sign-out')
        return
      },
      signIn: async (body: { email: string; password: string }) => {
        try {
          const signInResponse = await signIn(body)
          console.log(signInResponse, '??')

          const response = {
            isSuccess: true,
            data: {
              accessToken: signInResponse.accessToken,
              userId: signInResponse.userId,
            },
          }

          set(response.data)
          return response
        } catch (err) {
          console.log(err, '??!?!')
          if (axios.isAxiosError(err)) {
            console.log(err, '?!?!?!')
            const response = {
              isSuccess: false,
              data: null,
              err: err.response?.data,
            }
            return response
          }

          return {
            isSuccess: false,
            data: null,
          }
        }
      },

      signUp: async (body: {
        email: string
        password: string
        nickname: string
      }) => {
        try {
          const res = await signUp(body)
          console.log(res)
          const response = {
            isSuccess: true,
            data: {
              accessToken: res.accessToken,
              userId: res.userId,
            },
          }
          set(response.data)
          return response
        } catch (err) {
          if (axios.isAxiosError(err)) {
            const response = {
              isSuccess: false,
              data: null,
              err: err.response?.data,
            }
            return response
          }

          return {
            isSuccess: false,
            data: null,
          }
        }
      },

      refreshAccessToken: async () => {
        try {
          const res = await getAccessToken()

          if (!res.accessToken) {
            const response = {
              accessToken: null,
              userId: null,
            }
            set(response)
            return response
          }
          const response = {
            accessToken: res.accessToken,
            userId: res.userId,
          }
          set(response)
          return response
        } catch (err) {
          const response = {
            accessToken: null,
            userId: null,
          }
          set(response)
          return response
        }
      },
    }),
    {
      name: 'authStore',
    }
  )
)

async function signIn(body: { email: string; password: string }) {
  return axios
    .post<{ data: { accessToken: string; userId: number } }>(
      '/api/auth/sign-in',
      body
    )
    .then(v => v.data.data)
}

async function getAccessToken() {
  return axios
    .put<{ data: { accessToken: string; userId: number } }>(
      '/api/auth/refresh-token'
    )
    .then(v => {
      return v.data.data
    })
}

async function signUp(body: {
  email: string
  password: string
  nickname: string
}) {
  return axios
    .post<{ data: { accessToken: string; userId: number } }>(
      '/api/auth/sign-up',
      body
    )
    .then(v => v.data.data)
}
