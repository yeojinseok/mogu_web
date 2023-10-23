'use client'

import Image from 'next/image'
import backIcon from '../../../public/backIcon.svg'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

export default function Header({ title }: { title?: string }) {
  const router = useRouter()

  return (
    <div className="items-center justify-between h-56 p-16 h-stack title_subsection">
      <Image
        className=" hover:cursor-pointer"
        onClick={() => {
          router.back()
        }}
        src={backIcon}
        width={24}
        height={24}
        alt="backIcon"
      />
      <div className="">{title}</div>
      <div></div>
    </div>
  )
}
