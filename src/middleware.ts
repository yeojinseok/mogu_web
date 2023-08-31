import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { homeRoute } from './router/home'

export async function middleware(req: NextRequest) {
  // 서버사이드에서 로그인 유무를 판단할 수 있는 next-auth 제공 함수
  // 토큰 값이 falsy 하지 않으면 로그인 o

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  // 사용자가 요청하는 페이지 pathname
  const isProtectedPage = req.nextUrl.pathname.includes('protected')
  const isAuthPage = req.nextUrl.pathname.includes('auth')
  //@ts-ignore
  if (isProtectedPage && !token?.accessToken) {
    return NextResponse.redirect(new URL(authRoute.signIn, req.url))
  }
  //@ts-ignore
  // if (isAuthPage && token?.accessToken) {
  //   return NextResponse.redirect(new URL(homeRoute.index, req.url))
  // }
}

// export default withAuth(function middleware(req) {}, {
//   callbacks: {
//     authorized: ({ req, token }) => {
//       if (req.nextUrl.pathname.startsWith('/protected') && token === null) {
//         return false
//       }
//       return true
//     },
//   },
// })

//   // 미들웨어가 실행될 특정 pathname을 지정하면, 해당 pathname에서만 실행 가능
//   export const config = {
//       mathcher : [...withAuthList, ...withOutAuthList]
//   }
