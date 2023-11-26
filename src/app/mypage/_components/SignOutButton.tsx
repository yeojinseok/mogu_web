'use client'
import { Typography } from '@/components/common/Typography'
import { useAuthStore } from '@/feature/auth/store/authStore'
import { useRouter } from 'next/navigation'
import tw from 'twin.macro'

export default function SignOutButton() {
  const router = useRouter()
  const signOut = useAuthStore(state => state.signOut)
  return (
    <Typography
      onClick={() => {
        signOut()
        router.replace('/auth/email')
      }}
      twStyle={tw`underline cursor-pointer title_body`}
    >
      로그아웃
    </Typography>
  )
}
