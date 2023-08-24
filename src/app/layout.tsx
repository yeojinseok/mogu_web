import type { Metadata } from 'next'
import GlobalStyles from '@/styles/GlobalStyles'
import StyledComponentsRegistry from '@/lib/registry'

import '../app/globals.css'

export const metadata: Metadata = {
  title: 'Twin example',
  description: '',
}

export default function RootLayout({
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
        <div className="flex-auto w-full h-full overflow-hidden max-w-screen-tablet bg-grey-50">
          <StyledComponentsRegistry>
            <GlobalStyles />

            {children}
          </StyledComponentsRegistry>
        </div>
      </body>
    </html>
  )
}
