import type { Metadata } from 'next'
import GlobalStyles from '@/styles/GlobalStyles'
import StyledComponentsRegistry from '@/lib/registry'

import '../app/globals.css'

// const suit = localFont({
//   src: [
//     {
//       path: '../styles/fonts/SUIT-Thin.woff2',
//       weight: '100',
//       style: 'normal',
//     },
//     {
//       path: '../styles/fonts/SUIT-ExtraLight.woff2',
//       weight: '200',
//       style: 'normal',
//     },
//     {
//       path: '../styles/fonts/SUIT-Light.woff2',
//       weight: '300',
//       style: 'normal',
//     },
//     {
//       path: '../styles/fonts/SUIT-Regular.woff2',
//       weight: '400',
//       style: 'normal',
//     },
//     {
//       path: '../styles/fonts/SUIT-Medium.woff2',
//       weight: '500',
//       style: 'normal',
//     },
//     {
//       path: '../styles/fonts/SUIT-SemiBold.woff2',
//       weight: '600',
//       style: 'normal',
//     },
//     {
//       path: '../styles/fonts/SUIT-Bold.woff2',
//       weight: '700',
//       style: 'normal',
//     },
//     {
//       path: '../styles/fonts/SUIT-ExtraBold.woff2',
//       weight: '800',
//       style: 'normal',
//     },
//     {
//       path: '../styles/fonts/SUIT-Heavy.woff2',
//       weight: '900',
//       style: 'normal',
//     },
//   ],
// })

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
      <body
        style={
          {
            // fontFamily: 'suit',
          }
        }
      >
        <StyledComponentsRegistry>
          <GlobalStyles />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
