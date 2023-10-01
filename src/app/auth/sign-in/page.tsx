import Image from 'next/image'
import React from 'react'
import svg from '../../../../public/mogu.svg'
import Link from 'next/link'
import { getProviders } from 'next-auth/react'

export default async function SignIn(props: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="items-center justify-center w-full gap-48 p-16 v-stack">
        <div className="relative items-center gap-16 v-stack">
          <Image src={svg} width={60} height={60} alt="mogu-icon" />
          <div
            className="text-center title_screen"
            style={{
              whiteSpace: 'pre-line',
            }}
          >
            {'Always Together. \nWith Mogu.'}
          </div>
        </div>
        <Link
          className="flex w-full p-16 border rounded-8 border-1 title_body border-grey-300"
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
          <div className="w-full text-center "> 이메일로 계속하기</div>
        </Link>
      </div>
    </div>
  )
}
