'use client'
import { RecoilRoot } from 'recoil'

export default function RecoilProvider({
  children,
}: {
  children: React.ReactElement
}) {
  return <RecoilRoot>{children}</RecoilRoot>
}
