'use client'

import Image from 'next/image'
import backIcon from '../../../public/backIcon.svg'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()

  return (
    <div className="h-56 p-16 ">
      <Image
        onClick={() => {
          router.back()
        }}
        src={backIcon}
        width={24}
        height={24}
        alt="backIcon"
      />
    </div>
  )
}
