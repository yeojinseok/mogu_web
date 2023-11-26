'use client'

import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { VStack } from '@/components/common/Stack'
import { useCheckRegister } from '@/feature/auth/hook/react-query'
import { authRoute } from '@/router/auth'
import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'

export default function EmailFormSection() {
  const router = useRouter()

  const { handleSubmit, register, formState, watch } = useForm<{
    email: string
  }>()

  const { mutate } = useCheckRegister()

  return (
    <form
      className="h-full"
      onSubmit={handleSubmit(v => {
        mutate(v.email, {
          onSuccess: res => {
            if (res.data.isRegistered) {
              router.push(`${authRoute.signInEmail}?email=${v.email}`)
              return
            }
            router.push(`${authRoute.signUpEmail}?email=${v.email}`)
          },
        })
      })}
    >
      <VStack className="px-16 py-24 ">
        <Input
          placeholder="이메일"
          {...register('email', {
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
              message: '이메일 주소를 정확히 입력해 주세요.',
            },
          })}
          errorText={formState.errors.email?.message}
        />
      </VStack>
      <div className="footer">
        <Button disabled={!!formState.errors.email} type="submit">
          다음
        </Button>
      </div>
    </form>
  )
}
