import { cookies } from 'next/headers'

import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  request.cookies.delete('refreshToken')

  redirect('/')
}
