import Header from '@/components/home/Header'

import { getServerSession } from 'next-auth'
import { getSession } from 'next-auth/react'
import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import tw from 'twin.macro'
import { authOptions } from '../api/auth/[...nextauth]/route'
import Test from '@/components/home/Test'
import AuthContext from '@/context/AuthContext'

export default async function Home() {
  return (
    <div className="container">
      <Header />
    </div>
  )
}
