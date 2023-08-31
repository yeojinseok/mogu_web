import Image from 'next/image'
import React from 'react'
import svg from '../../../../public/mogu.svg'
import Link from 'next/link'

export default function SignIn() {
  return (
    <div className="container flex items-center justify-center">
      <div className="items-center justify-center w-full gap-48 h-stack">
        <div className="relative items-center gap-16 h-stack">
          <Image src={svg} width={60} height={60} alt="mogu-icon" />
          <div className="title_screen">{'Always Together.With Mogu.'}</div>
        </div>
        <Link
          className="flex w-full p-16 border rounded-lg title_body border-grey-300"
          href={'/auth/sign-in/email'}
        >
          <Image
            className="absolute"
            src={svg}
            width={24}
            height={24}
            alt="mogu-icon"
          />
          <div className="w-full text-center"> 이메일로 계속하기</div>
        </Link>
      </div>
    </div>
  )
}
