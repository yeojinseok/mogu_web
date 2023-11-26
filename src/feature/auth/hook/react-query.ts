import { CheckRegisterResponseType } from '../types'
import { axiosInstance } from '@/axios/axiosInstance'
import { useMutation } from '@tanstack/react-query'

export function useCheckRegister() {
  return useMutation((email: string) => {
    return axiosInstance
      .get<CheckRegisterResponseType>('/users/check-register', {
        params: { email },
      })
      .then(v => v.data)
  })
}
