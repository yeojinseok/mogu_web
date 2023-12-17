'use client'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '../store/authStore'
import React from 'react'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { userId, accessToken, signOut } = useAuthStore(state => state)

  React.useEffect(() => {
    if (!userId || !accessToken) {
      //FIXME: required open modal system (role을 받아서 분기 필요)
      signOut()
    }
  }, [userId, accessToken])

  if (!userId || !accessToken) {
    return <></>
  }

  return <>{children}</>
}
