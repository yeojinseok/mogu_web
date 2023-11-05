import { axiosInstance } from '@/axios/axiosInstance'
import axios, { AxiosError } from 'axios'
import { jwtDecode } from 'jwt-decode'
import { redirect } from 'next/navigation'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthStateType = {
  isLogin: boolean
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

      isLogin: !!get().userId && !!get().accessToken,

      signOut: () => {
        set({
          accessToken: null,
          userId: null,
        })

        if (!window) {
          redirect('/auth/sign-in')
        }

        window.location.href = '/auth/sign-in'
        return
      },
      signIn: async (body: { email: string; password: string }) => {
        try {
          const accessToken = await signIn(body)

          const decoded = jwtDecode<{ userId: number }>(accessToken)

          const response = {
            isSuccess: true,
            data: {
              accessToken: accessToken,
              userId: decoded.userId,
            },
          }
          set(response.data)
          return response
        } catch (err) {
          if (axios.isAxiosError(err)) {
            const response = {
              isSuccess: false,
              data: null,
              err: err,
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
          const accessToken = await signUp(body)

          const decoded = jwtDecode<{ userId: number }>(accessToken)

          const response = {
            isSuccess: true,
            data: {
              accessToken: accessToken,
              userId: decoded.userId,
            },
          }
          set(response.data)
          return response
        } catch (err) {
          if (axios.isAxiosError(err)) {
            const response = {
              isSuccess: false,
              data: null,
              err: err,
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
          const accessToken = await getAccessToken()
          if (!!accessToken) {
            const response = {
              accessToken: null,
              userId: null,
            }
            set(response)
            return response
          }

          const decoded = jwtDecode<{ userId: number }>(accessToken)

          const response = {
            accessToken: accessToken,
            userId: decoded.userId,
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
  return axiosInstance
    .post<{ data: { accessToken: string } }>('/authentication/login', body)
    .then(v => v.data.data.accessToken)
}

async function getAccessToken() {
  return axiosInstance
    .put<{ data: { accessToken: string } }>('/authentication/refresh')
    .then(v => v.data.data.accessToken)
}

async function signUp(body: {
  email: string
  password: string
  nickname: string
}) {
  return axiosInstance
    .post<{ data: { accessToken: string } }>('/authentication/register', body)
    .then(v => v.data.data.accessToken)
}
