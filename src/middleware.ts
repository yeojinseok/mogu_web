import { NextRequest, NextResponse } from 'next/server'
import { homeRoute } from './router/home'

import { useAuthStore } from './feature/auth/authStore'

export async function middleware(req: NextRequest) {
  const { isLogin, userId } = useAuthStore.getState()

  // 사용자가 요청하는 페이지 pathname
  const isProtectedPage =
    req.nextUrl.pathname.includes('protected') || req.nextUrl.pathname === '/'

  if (isProtectedPage && !isLogin) {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url))
  }

  if (req.nextUrl.pathname === '/') {
    if (!isLogin || !userId) {
      return NextResponse.redirect(new URL('/auth/sign-in', req.url))
    }
    return NextResponse.redirect(new URL(homeRoute.home(userId), req.url))
  }
}
