import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { homeRoute } from './router/home'
import { authRoute } from './router/auth'

export async function middleware(req: NextRequest) {
  // 서버사이드에서 로그인 유무를 판단할 수 있는 next-auth 제공 함수
  // 토큰 값이 falsy 하지 않으면 로그인 o

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  // 사용자가 요청하는 페이지 pathname
  const isProtectedPage =
    req.nextUrl.pathname.includes('protected') || req.nextUrl.pathname === '/'
  // const isAuthPage = req.nextUrl.pathname.includes('auth')

  if (isProtectedPage && !token?.accessToken) {
    return NextResponse.redirect(new URL('/api/auth/signin', req.url))
  }

  if (req.nextUrl.pathname === '/') {
    console.log('??')
    if (!token) {
      return NextResponse.redirect(new URL('/api/auth/signin', req.url))
    }
    return NextResponse.redirect(
      new URL(homeRoute.home(token?.id ?? ''), req.url)
    )
  }
}
