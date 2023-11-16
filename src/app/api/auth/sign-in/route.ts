import { axiosInstance } from '@/axios/axiosInstance'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  const data = await req.json()

  const res = await axiosInstance
    .post<{
      data: { accessToken: string; refreshToken: string; userId: number }
    }>('/authentication/login', data, {
      withCredentials: true,
    })
    .then(v => v)

  cookies().set({
    name: 'refreshToken',
    value: res.data.data.refreshToken,
    httpOnly: true,
  })
  return Response.json(res.data)
}
