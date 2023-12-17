import { useCallback, useEffect, useRef, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import tw from 'twin.macro'
import { HStack } from './Stack'

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
  renderInput,
}: {
  options: OptionType
  onChange: (value: string) => void
  renderInput: (handleSelect: () => void) => React.ReactNode
}) {
  const iconRef = useRef<HTMLDivElement>(null)

  const [isFocus, setIsFocus] = useState(false)

  const getContainerRect = () => {
    if (!iconRef.current) return

    //XXX: getBoundingClientRect는 성능 이슈가 있음 고려해야함.
    const { bottom, right } = iconRef.current.getBoundingClientRect()

    return {
      left: right - iconRef.current.offsetWidth,
      top: bottom + 10,
    }
  }

  return (
    <div
      ref={iconRef}
      tabIndex={-1}
      className="flex "
      onBlur={() => {
        setIsFocus(false)
      }}
    >
      <HStack className="items-center gap-12">
        <div className="w-65">
          {renderInput(() => {
            setIsFocus(prev => !prev)
          })}
        </div>
        <div
          onClick={() => {
            setIsFocus(prev => !prev)
          }}
        >
          <FaChevronDown size={12} />
        </div>
      </HStack>
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
  )
}
