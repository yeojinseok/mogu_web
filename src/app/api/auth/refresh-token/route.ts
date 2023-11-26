import axios from 'axios'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

import { cookies } from 'next/headers'

export async function PUT(req: NextRequest) {
  const refreshToken = req.cookies.get('refreshToken')

  if (!refreshToken) {
    req.cookies.delete('refreshToken')
    redirect('/')
  }

  try {
    const res = await axios
      .put<{
        data: { accessToken: string; refreshToken: string; userId: number }
      }>(`${process.env.NEXT_PUBLIC_API}/authentication/refresh`, {
        headers: {
          Authorization: `Bearer ${refreshToken.value}`,
          'Content-Type': 'application/json',
        },
      })
      .then(v => v)

    return NextResponse.json(res.data)
  } catch (err) {
    cookies().delete('refreshToken')
    redirect('/')
  }
}
