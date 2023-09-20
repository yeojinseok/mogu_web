import { useCallback, useEffect, useRef, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import tw from 'twin.macro'

type OptionType = {
  value: string
  label: string
}[]

export default function MoguSelect({
  options,
  onChange,
}: {
  options: OptionType
  onChange: (value: string) => void
}) {
  const iconRef = useRef<HTMLDivElement>(null)

  const [isFocus, setIsFocus] = useState(false)

  return (
    <div
      ref={iconRef}
      tabIndex={-1}
      className="relative flex"
      onBlur={() => {
        setIsFocus(false)
      }}
    >
      <div
        ref={iconRef}
        onClick={() => {
          setIsFocus(prev => !prev)
        }}
      >
        <FaChevronDown size={12} />
      </div>
      {isFocus && (
        <div className="absolute px-8 py-4 shadow-lg -left-100 top-12 text-grey-500 rounded-8 min-w-120 ">
          {options.map((option, index) => (
            <div
              key={option.value}
              css={
                options.length !== index + 1
                  ? tw` body_large border-b-1 border-b-grey-50`
                  : undefined
              }
              className="py-8 text-center body_large"
              onClick={() => {
                setIsFocus(false)
                onChange(option.value)
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
