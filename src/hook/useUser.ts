import { signOut, useSession } from 'next-auth/react'
import React from 'react'

/**
 * useSession에서 user data를 return 합니다.
 * @returns user
 */
export default function useUser() {
  const session = useSession()

  const user = React.useMemo(() => {
    return session.data?.user
  }, [session.data?.user])

  if (!user) {
    signOut()
    throw new Error('non user')
  }

  return user
}
