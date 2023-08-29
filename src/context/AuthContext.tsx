'use client'
import { setAccessToken } from '@/axios/axiosInstance'
import { Session } from 'next-auth'
import { SessionProvider, signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function AuthContext({
  children,
  session,
}: {
  children: React.ReactNode
  session: Session | null
}) {
  return (
    <SessionProvider session={session}>
      <TokenConsumer />
      {children}
    </SessionProvider>
  )
}

function TokenConsumer() {
  const session = useSession()
  useEffect(() => {
    if (session.status === 'authenticated') {
      //@ts-ignore
      if (session.data?.accessToken != null) {
        //@ts-ignore
        setAccessToken(session.data.accessToken)
        return
      }
      signOut()
    }
  }, [session])
  return null
}
