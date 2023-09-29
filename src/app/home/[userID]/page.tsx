import Header from '@/components/home/Header'

import React from 'react'

export default async function Home({}: { params: { userID: string } }) {
  return (
    <div className="">
      <Header />
    </div>
  )
}
