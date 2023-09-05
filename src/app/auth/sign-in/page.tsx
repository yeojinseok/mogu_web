import Image from 'next/image'
import React from 'react'
import svg from '../../../../public/mogu.svg'
import Link from 'next/link'
import { getProviders } from 'next-auth/react'

export default async function SignIn(props: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const providers = await getProviders()

  console.log(providers)

  return (
    <div className="container flex items-center justify-center">
      <div className="items-center justify-center w-full gap-48 p-16 h-stack">
        <div className="relative items-center gap-16 h-stack">
          <Image src={svg} width={60} height={60} alt="mogu-icon" />
          <div className="title_screen">{'Always Together.With Mogu.'}</div>
        </div>
        <Link
          className="flex w-full p-16 border rounded-lg title_body border-grey-300"
          href={{
            pathname: '/auth/sign-in/email',
            query: props.searchParams,
          }}
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
