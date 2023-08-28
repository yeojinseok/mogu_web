import axios from 'axios'
import qs from 'qs'

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ACLOSET_API,
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
