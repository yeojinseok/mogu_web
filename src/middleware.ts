import { NextRequest, NextResponse } from 'next/server'
import { homeRoute } from './router/home'

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL(homeRoute.index, req.url))
  }
}
