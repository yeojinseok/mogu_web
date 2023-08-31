import Image from 'next/image'
import React from 'react'
import svg from '../../../../../public/mogu.svg'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import { signIn } from 'next-auth/react'

export default function SignInEmail() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="gap-24 pt-24 h-stack">
          <div className="relative items-center gap-16 h-stack">
            <Image src={svg} width={44} height={44} alt="mogu-icon" />
            <div className=" title_body">{'Always Together'}</div>
          </div>

          <div className="h-stack">
            <input className="border h-78" />
            <input />
          </div>
        </div>
      </div>
    </>
  )
}
