import { axiosInstance } from '@/axios/axiosInstance'
import { jwtDecode } from 'jwt-decode'
import { create } from 'zustand'
import { StateStorage, persist } from 'zustand/middleware'

type AuthStateType = {
  isLogin: boolean
  accessToken: string | null
  userId: number | null

  initialize: () => Promise<{
    isLogin: boolean
    accessToken: string | null
    userId: number | null
  }>
}

export const useAuthStore = create(
  persist<AuthStateType>(
    (set, get) => ({
      isLogin: false,
      accessToken: null,
      userId: null,
      initialize: async () => {
        try {
          const accessToken = await axiosInstance
            .put('/authentication/refresh')
            .then(v => v.data.data.accessToken)
          if (!!accessToken) {
            const response = {
              accessToken: null,
              isLogin: false,
              userId: null,
            }
            set(response)
            return response
          }

          const decoded = jwtDecode<{ userId: number }>(accessToken)

          const response = {
            accessToken: accessToken,
            isLogin: true,
            userId: decoded.userId,
          }
          set(response)
          return response
        } catch (err) {
          const response = {
            accessToken: null,
            isLogin: false,
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
