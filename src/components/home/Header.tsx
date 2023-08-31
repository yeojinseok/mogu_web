'use client'
import { axiosInstance } from '@/axios/axiosInstance'
import { getSession, signIn, useSession } from 'next-auth/react'

/**
 * Home 화면의 Header
 */
export default function Header() {
  const use = useSession()

  return (
    <>
      <div
        onClick={() => signIn()}
        className=" h-[140px] p-4 flex flex-col gap-4 "
      >
        <div className="flex justify-end">
          <span className="w-8 h-8 rounded-full bg-grey-50" />
        </div>
        <div className="flex items-center justify-between w-full px-5 py-4 rounded-lg h-29 bg-lime-500">
          <span className=" title_subsection">정산하기</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <rect width="24" height="24" fill="#C4C4C4" />
          </svg>
        </div>
      </div>
      <button
        onClick={async () => {
          const data = await getSession()
          axiosInstance.get('/shops').then(v => console.log(v.data))
        }}
      >
        asdfsdf
      </button>
    </>
  )
}
