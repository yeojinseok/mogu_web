'use client'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '../store/authStore'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { userId, accessToken } = useAuthStore(state => state)

  if (!userId || !accessToken) {
    //FIXME: required open modal system (role을 받아서 분기 필요)
    router.replace('/auth/sign-in')
    return null
  }

  return <>{children}</>
}
