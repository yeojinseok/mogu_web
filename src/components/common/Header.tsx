'use client'

import Image from 'next/image'
import backIcon from '../../../public/backIcon.svg'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/feature/auth/store/authStore'

export default function Header({
  title,
  onClickBackButton,
}: {
  title?: string
  onClickBackButton?: () => void
}) {
  const router = useRouter()

  return (
    <div className="relative items-center justify-center w-full h-56 p-16 h-stack title_subsection border-b-1 border-b-grey-50">
      <div className="absolute left-16">
        <Image
          className=" hover:cursor-pointer"
          onClick={() => {
            if (onClickBackButton) {
              onClickBackButton()
              return
            }
            router.back()
          }}
          src={backIcon}
          width={24}
          height={24}
          alt="backIcon"
        />
      </div>
      <div className=" title_subsection">{title}</div>
    </div>
  )
}
