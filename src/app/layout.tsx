import type { Metadata } from 'next'
import GlobalStyles from '@/styles/GlobalStyles'
import StyledComponentsRegistry from '@/lib/registry'

import '../app/globals.css'
import AuthContext from '@/feature/auth/wrappers/AuthContext'
import RecoilProvider from '@/context/RecoilProvider'
import SnackbarProvider from '@/context/SnackbarPrivider'
import ReactQueryProvider from '@/context/ReactQueryProvider'
import AuthGuard from '@/feature/auth/wrappers/AuthGuard'

export const metadata: Metadata = {
  title: 'Twin example',
  description: '',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="/dist/output.css" rel="stylesheet" />
      </head>
      <body className="flex items-center justify-center h-full bg-grey-900">
        <div className="flex-auto w-full h-full overflow-hidden bg-white max-w-screen-tablet">
          <StyledComponentsRegistry>
            <GlobalStyles />
            <ReactQueryProvider>
              <RecoilProvider>
                <SnackbarProvider>
                  <AuthContext>
                    <AuthGuard>{children}</AuthGuard>
                  </AuthContext>
                </SnackbarProvider>
              </RecoilProvider>
            </ReactQueryProvider>
          </StyledComponentsRegistry>
        </div>
      </body>
    </html>
  )
}
