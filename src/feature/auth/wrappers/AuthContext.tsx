'use client'
import { useAuthStore } from '@/feature/auth/store/authStore'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

export default function AuthContext({
  children,
}: {
  children: React.ReactNode
}) {
  const path = usePathname()
  const navigate = useRouter()

  const isProtectedPage = path.includes('protected') || path === '/'

  const initialize = useAuthStore(state => state.refreshAccessToken)

  const [isInitialized, setIsInitialized] = React.useState(false)

  React.useLayoutEffect(() => {
    initialize().then(response => {
      setIsInitialized(true)

      if (isProtectedPage && (!response.accessToken || !response.userId)) {
        navigate.replace('/auth/sign-in')
      }
    })

    return () => setIsInitialized(false)
  }, [])

  // if (!isInitialized) {
  //   return <div>loading....</div>
  // }

  return <>{children}</>
}
