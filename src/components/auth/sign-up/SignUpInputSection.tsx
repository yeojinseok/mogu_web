'use client'
import React from 'react'

import { Input } from '@/components/common/Input'
import { Button, StickyButton } from '@/components/common/Button'
import { useRouter } from 'next/navigation'
import { VStack } from '@/components/common/Stack'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '@/feature/auth/store/authStore'
import useQueryParams from '@/hook/useQueryParams'

export default function SignUpInputSection() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const { queryParams } = useQueryParams()

  const email = queryParams.get('email')

  const signUp = useAuthStore(state => state.signUp)

  const { handleSubmit, register } = useForm<{
    email: string
    password: string
    nickname: string
  }>({
    defaultValues: {
      email: email ?? '',
    },
  })

  if (!email) {
    throw new Error('요청 url이 잘못 되었습니다.')
  }

  return (
    <VStack className="h-full">
      <VStack className="justify-between h-full pt-20 overflow-scroll pb-84">
        <div className="p-16 pt-24 gap-36 v-stack">
          <Input {...register('email')} placeholder="이메일" disabled />
          <VStack className="gap-8">
            <div className=" v-stack">
              <Input
                placeholder="비밀번호"
                type="password"
                {...register('password')}
              />
              <Input name="password" placeholder="비밀번호" type="password" />
            </div>
            <div className=" body_default text-grey-900">
              영문,숫자,특수문자 2가지 이상 조합(8~20자)
            </div>
          </VStack>
          <VStack className="gap-8">
            <Input {...register('nickname')} placeholder="닉네임" />
            <div className=" body_default text-grey-900">
              영어,숫자,한글(2~16자)
            </div>
          </VStack>
        </div>
        <div className="px-16 ">
          원활한 서비스 이용을 위해{' '}
          <span className="underline ">서비스 이용 약관</span>,{' '}
          <span className="underline">개인정보수집 및 이용</span>에 동의합니다.
        </div>
      </VStack>

      <StickyButton>동의하고 계속하기</StickyButton>
    </VStack>
  )
}
