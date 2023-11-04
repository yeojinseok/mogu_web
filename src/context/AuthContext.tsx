'use client'
import { useAuthStore } from '@/feature/auth/authStore'
import { useRouter } from 'next/router'
import React from 'react'

export default function AuthContext({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const path = router.pathname

  const isProtectedPage = path.includes('protected') || path === '/'

  const initialize = useAuthStore(state => state.initialize)

  const [isInitialized, setIsInitialized] = React.useState(false)

  React.useEffect(() => {
    initialize().then(response => {
      setIsInitialized(true)

      if (isProtectedPage && !response.isLogin) {
        router.replace('/auth/sign-in')
      }
    })

    return () => setIsInitialized(false)
  }, [])

  if (!isInitialized) {
    return <div>loading....</div>
  }

  return <>{children}</>
}
