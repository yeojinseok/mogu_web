import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { getCsrfToken, getSession } from 'next-auth/react'

export default async function Test() {
  const data = await getServerSession(authOptions)

  return <div>{JSON.stringify(data)}</div>
}
