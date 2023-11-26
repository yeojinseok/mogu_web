import { cookies } from 'next/headers'

import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  cookies().delete('refreshToken')

  redirect('/auth/email')
}
