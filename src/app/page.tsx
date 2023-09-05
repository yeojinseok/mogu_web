'use client'
import Image from 'next/image'
import React, { useEffect } from 'react'
import svg from '../../public/mogu.svg'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'

export default function Home() {
  const session = useSession()

  useEffect(() => {
    if (!session.data?.accessToken) {
      signIn()
      return
    } else {
      // id에 해당하는 home 화면 보여주기
    }
  })
  return (
    <div className="container flex items-center justify-center">loading</div>
  )
}
