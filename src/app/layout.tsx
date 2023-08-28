import type { Metadata } from 'next'
import GlobalStyles from '@/styles/GlobalStyles'
import StyledComponentsRegistry from '@/lib/registry'

import '../app/globals.css'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import AuthContext from '@/context/AuthContext'

export const metadata: Metadata = {
  title: 'Twin example',
  description: '',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <head>
        <link href="/dist/output.css" rel="stylesheet" />
      </head>
      <body className="flex items-center justify-center h-full bg-grey-900">
        <div className="flex-auto w-full h-full overflow-hidden bg-white max-w-screen-tablet">
          <StyledComponentsRegistry>
            <GlobalStyles />
            <AuthContext session={session}>{children}</AuthContext>
          </StyledComponentsRegistry>
        </div>
      </body>
    </html>
  )
}
