'use client'
import Image from 'next/image'
import React from 'react'
import svg from '@public/mogu.svg'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSnackbar } from 'notistack'
import { useAuthStore } from '@/feature/auth/store/authStore'

export default function SignInInputSection() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const signIn = useAuthStore().signIn

  const { handleSubmit, register } = useForm<{
    email: string
    password: string
  }>()

  return (
    <div className="pt-20">
      <form
        method="post"
        onSubmit={handleSubmit(async data => {
          const response = await signIn(data)
          if (!response.isSuccess) {
            enqueueSnackbar(response.err?.message)
            return
          }

          router.replace('/')
        })}
      >
        <div className="gap-24 p-16 pt-24 v-stack">
          <div className="relative items-center gap-8 v-stack">
            <Image src={svg} width={44} height={44} alt="mogu-icon" />
            <div className=" title_body">{'Always Together'}</div>
          </div>

          <div className="gap-8 v-stack">
            <Input placeholder="이메일" {...register('email')} />
            <Input
              placeholder="비밀번호"
              type="password"
              {...register('password')}
            />
          </div>
          <Link
            href={{
              pathname: '/auth/sign-up/email',
            }}
          >
            <div className="justify-center underline text-grey-700 h-stack">
              회원가입 하기
            </div>
          </Link>
        </div>

        <div className="p-16 footer">
          <Button type="submit">로그인</Button>
        </div>
      </form>
    </div>
  )
}
