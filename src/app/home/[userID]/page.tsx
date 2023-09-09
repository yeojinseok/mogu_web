import Header from '@/components/home/Header'

import React from 'react'

export default async function Home({ parmas }: { params: { userID: string } }) {
  return (
    <div className="container">
      <Header />
    </div>
  )
}
