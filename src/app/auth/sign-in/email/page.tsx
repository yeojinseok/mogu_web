import Image from 'next/image'
import React from 'react'

import Header from '@/components/common/Header'

import SignInInputSection from '@/components/auth/sign-in/SigninInputSection'

export default async function SignInEmail(props: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <>
      <Header />
      <SignInInputSection />
    </>
  )
}
