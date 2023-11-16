import { axiosInstance } from '@/axios/axiosInstance'
import { cookies } from 'next/headers'

export async function PUT(req: Request) {
  const data = await req.json()

  const refreshToken = cookies().get('refreshToken')

  const res = await axiosInstance
    .put<{
      data: { accessToken: string; refreshToken: string; userId: number }
    }>('/authentication/refresh', data, {
      withCredentials: true,
      headers: {
        Cookie: `refreshToken=${refreshToken?.value}`,
      },
    })
    .then(v => v)

  return Response.json(res.data)
}
