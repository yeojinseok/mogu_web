import Header from '@/components/home/Header'
import TabPage from '@/components/home/Tab/TabPage'
import { cookies } from 'next/headers'

import React from 'react'

export default async function Home() {
  return (
    <div className="h-full ">
      <Header />
      <TabPage />
    </div>
  )
}
