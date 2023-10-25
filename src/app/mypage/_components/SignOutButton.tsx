'use client'
import { Typography } from '@/components/common/Typography'
import { signOut } from 'next-auth/react'
import tw from 'twin.macro'

export default function SignOutButton() {
  return (
    <Typography
      onClick={() => signOut({ callbackUrl: '/', redirect: true })}
      twStyle={tw`underline title_body`}
    >
      로그아웃
    </Typography>
  )
}
