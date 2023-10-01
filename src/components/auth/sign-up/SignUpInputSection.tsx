'use client'
import Image from 'next/image'
import React from 'react'
import svg from '@public/mogu.svg'
import Header from '@/components/common/Header'

import { signIn } from 'next-auth/react'
import { Input } from '@/components/common/Input'
import { Button, ButtonStyled } from '@/components/common/Button'
import { useRouter, useSearchParams } from 'next/navigation'
import { VStack } from '@/components/common/Stack'
import { useSnackbar } from 'notistack'

export default function SignUpInputSection() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')

  return (
    <VStack className="justify-between h-full pt-20 pb-84">
      <form
        method="post"
        onSubmit={async event => {
          const data = new FormData(event.currentTarget)

          await signIn('credentials', {
            nickname: data.get('nickname') as string,
            isSignUp: true,
            redirect: true,
            email: data.get('email') as string,
            password: data.get('password') as string,
            callbackUrl: callbackUrl as string,
          }).then(res => {
            console.log(res)
            if (!res?.error) {
              router.push(callbackUrl ?? '/')
            } else {
              enqueueSnackbar(res.error)
            }
          })
        }}
      >
        <div className="p-16 pt-24 gap-36 v-stack">
          <Input name="email" placeholder="이메일" />
          <VStack className="gap-8">
            <div className=" v-stack">
              <Input name="password" placeholder="비밀번호" type="password" />
              <Input name="password" placeholder="비밀번호" type="password" />
            </div>
            <div className=" body_default text-grey-900">
              영문,숫자,특수문자 2가지 이상 조합(8~20자)
            </div>
          </VStack>
          <VStack className="gap-8">
            <Input name="nickname" placeholder="닉네임" />
            <div className=" body_default text-grey-900">
              영어,숫자,한글(2~16자)
            </div>
          </VStack>
        </div>
        <div className="p-16 footer">
          <Button type="submit">동의하고 계속하기</Button>
        </div>
      </form>

      <div className="px-16 ">
        원활한 서비스 이용을 위해{' '}
        <span className="underline ">서비스 이용 약관</span>,{' '}
        <span className="underline">개인정보수집 및 이용</span>에 동의합니다.
      </div>
    </VStack>
  )
}
