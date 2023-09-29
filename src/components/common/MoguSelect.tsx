import { useCallback, useEffect, useRef, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import tw from 'twin.macro'

type OptionType = {
  value: string
  label: string
}[]

/**
 * 최대 사이즈가 max-width를 넘어가는 경우 left값이 의도된 위치로 가지 않음
 */
export default function MoguSelect({
  options,
  onChange,
}: {
  options: OptionType
  onChange: (value: string) => void
}) {
  const iconRef = useRef<HTMLDivElement>(null)

  const [isFocus, setIsFocus] = useState(false)

  const getContainerRect = () => {
    if (!iconRef.current) return

    const { left, bottom } = iconRef.current.getBoundingClientRect()
    return {
      right: left - 20,
      top: bottom + 10,
    }
  }

  // useEffect(() => {
  //   addEventListener('mousedown', e => console.log(e.clientX, e.clientY))
  // }, [])

  return (
    <div
      style={
        {
          // transform: `rotate(0)`,
        }
      }
    >
      <div
        ref={iconRef}
        tabIndex={-1}
        className="flex "
        onBlur={() => {
          setIsFocus(false)
        }}
      >
        <div
          onClick={() => {
            setIsFocus(prev => !prev)
          }}
        >
          <FaChevronDown size={12} />
        </div>
        {isFocus && (
          <div
            className="fixed z-50 px-8 py-4 bg-white shadow-lg text-grey-500 rounded-8 min-w-120 "
            style={getContainerRect()}
          >
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
    </div>
  )
}
