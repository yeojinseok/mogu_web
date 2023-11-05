import Image from 'next/image'
import React from 'react'
import svg from '../../../../../public/mogu.svg'
import Header from '@/components/common/Header'

import { Input } from '@/components/common/Input'
import { Button, ButtonStyled } from '@/components/common/Button'

import { VStack } from '@/components/common/Stack'
import SignUpInputSection from '@/components/auth/sign-up/SignUpInputSection'

export default async function SignUpEmail(props: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <VStack className="h-full">
      <Header />
      <SignUpInputSection />
    </VStack>
  )
}
