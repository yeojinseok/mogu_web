import { axiosInstance } from '@/axios/axiosInstance'
import axios from 'axios'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest) {
  const refreshToken = req.cookies.get('refreshToken')

  try {
    const res = await axiosInstance
      .put<{
        data: { accessToken: string; refreshToken: string; userId: number }
      }>('/authentication/refresh', {
        headers: {
          Cookie: `refreshToken=${refreshToken?.value}`,
        },
      })
      .then(v => v)

    return NextResponse.json(res.data)
  } catch (err) {
    if (axios.isAxiosError(err)) {
    }
    req.cookies.delete('refreshToken')
    redirect('/')
  }
}
