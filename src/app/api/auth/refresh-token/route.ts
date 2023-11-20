import { axiosInstance } from '@/axios/axiosInstance'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function PUT(req: NextRequest) {
  const data = await req.json()

  const refreshToken = req.cookies.get('refreshToken')

  try {
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
  } catch (err) {
    redirect('/')
  }
}
