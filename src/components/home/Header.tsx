import Link from 'next/link'

/**
 * Home 화면의 Header
 */
export default function Header() {
  return (
    <>
      <div className="gap-16 p-16 h-stack ">
        <div className="flex justify-end">
          <span className="w-32 h-32 rounded-full bg-grey-50" />
        </div>
        <Link href={'/home/settlement'}>
          <button className="flex items-center justify-between w-full p-16 rounded-lg h-60 bg-lime-500">
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
          </button>
        </Link>
      </div>
    </>
  )
}
