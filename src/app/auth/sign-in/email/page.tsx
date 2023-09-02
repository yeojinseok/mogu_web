import Image from 'next/image'
import React from 'react'
import svg from '../../../../../public/mogu.svg'
import Link from 'next/link'
import Header from '@/components/common/Header'
import { signIn } from 'next-auth/react'
import { Input } from '@/components/common/Input'

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
            <form>
              <Input placeholder="이메일" />
              <Input placeholder="비밀번호" type="password" />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
