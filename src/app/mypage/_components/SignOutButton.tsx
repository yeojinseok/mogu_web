'use client'
import { Typography } from '@/components/common/Typography'
import { useAuthStore } from '@/feature/auth/store/authStore'
import tw from 'twin.macro'

export default function SignOutButton() {
  const signOut = useAuthStore(state => state.signOut)
  return (
    <Typography onClick={() => signOut()} twStyle={tw`underline title_body`}>
      로그아웃
    </Typography>
  )
}
