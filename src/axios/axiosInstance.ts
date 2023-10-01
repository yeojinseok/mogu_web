import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import axios, { AxiosError } from 'axios'
import { getServerSession } from 'next-auth'
import { getSession } from 'next-auth/react'
import qs from 'qs'

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  headers: {
    mode: 'cors',
    'Content-Type': 'application/json',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  },
  paramsSerializer: {
    serialize: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    },
  },
})

axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config
    if (error.response?.status === 401) {
      const token =
        (await getSession()) || (await getServerSession(authOptions))
      //@ts-ignore
      const accessToken = token?.accessToken as string
      if (!accessToken) {
        window.location.href = '/sign-in'
      }
      setAccessToken(accessToken)
      if (originalRequest != null) {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
      }
    }

    return Promise.reject(error)
  }
)
export const setAccessToken = (accessToken: string) => {
  axiosInstance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${accessToken}`
}
