import { cookies } from 'next/headers'

import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  //@ts-ignore
  cookies().delete('refreshToken')
}
