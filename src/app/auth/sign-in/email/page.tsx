'use client'
import Image from 'next/image'
import React from 'react'
import svg from '../../../../../public/mogu.svg'
import Header from '@/components/common/Header'

import { signIn } from 'next-auth/react'
import { Input } from '@/components/common/Input'
import { Button, ButtonStyled } from '@/components/common/Button'

export default async function SignInEmail(props: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <>
      <Header />
      <div className="">
        <form
          method="post"
          onSubmit={async event => {
            const data = new FormData(event.currentTarget)

            await signIn('credentials', {
              email: data.get('email') as string,
              password: data.get('password') as string,
              redirect: true,
              callbackUrl: props.searchParams.callbackUrl as string,
            })
          }}
        >
          <div className="gap-24 p-16 pt-24 v-stack">
            <div className="relative items-center gap-8 v-stack">
              <Image src={svg} width={44} height={44} alt="mogu-icon" />
              <div className=" title_body">{'Always Together'}</div>
            </div>

            <div className="gap-8 v-stack">
              <Input name="email" placeholder="이메일" />
              <Input name="password" placeholder="비밀번호" type="password" />
            </div>
            <div>
              <div className="justify-center underline text-grey-700 h-stack">
                회원가입 하기
              </div>
            </div>
          </div>
          <div className="p-16 footer">
            <Button type="submit">로그인</Button>
          </div>
        </form>
      </div>
    </>
  )
}
