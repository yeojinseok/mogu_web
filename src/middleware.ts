import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // 서버사이드에서 로그인 유무를 판단할 수 있는 next-auth 제공 함수
  // 토큰 값이 falsy 하지 않으면 로그인 o
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  // 사용자가 요청하는 페이지 pathname
  const { pathname } = req.nextUrl
  // 해당 pathname이 미리 정의해둔 withAuth, withOutAuth 배열 중 어디에 속하는지 확인
  // const isWithAuth = withAuthList.includes(pathname);
  // const isWithOutAuth = withOutAuthList.includes(pathname);

  // if (isWithAuth) return withAuth(req, !!token); // 로그인 여부에 따라 redirect 하는 함수
  // else if (isWithOutAuth) return withOutAuth(req, !!token); // 로그인 여부에 따라 redirect 하는 함수
}

//   // 미들웨어가 실행될 특정 pathname을 지정하면, 해당 pathname에서만 실행 가능
//   export const config = {
//       mathcher : [...withAuthList, ...withOutAuthList]
//   }
