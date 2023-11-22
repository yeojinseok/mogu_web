import { axiosInstance } from '@/axios/axiosInstance'
import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const data = await req.json()

  try {
    const res = await axiosInstance
      .post<{
        data: { accessToken: string; refreshToken: string; userId: number }
      }>('/authentication/login', data, {
        withCredentials: true,
      })
      .then(v => v)

    const nextResponse = NextResponse.json(res.data)
    nextResponse.cookies.set({
      name: 'refreshToken',
      value: res.data.data.refreshToken,
      httpOnly: true,
    })
    return nextResponse
  } catch (err) {
    if (!axios.isAxiosError(err)) {
      return NextResponse.json({ message: null }, { status: 500 })
    }
    return NextResponse.json(
      { message: err.response?.data.message },
      {
        status: err.response?.data.code,
      }
    )
  }
}
