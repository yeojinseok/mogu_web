'use client'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import React, { useState } from 'react'
import { VStack } from './Stack'

interface CustomDivProps extends React.HTMLProps<HTMLDivElement> {
  titleComponent: React.ReactNode
  onToggle?: (isOpen: boolean) => void
  initToggleState?: boolean
}

export const Collapsible = React.forwardRef<HTMLDivElement, CustomDivProps>(
  function Collapsible(props, ref) {
    const [isVisible, setIsVisible] = useState(props.initToggleState ?? false)

    return (
      <VStack className="w-full">
        <div
          className="w-full"
          ref={ref}
          onClick={() => {
            setIsVisible(prev => {
              props.onToggle?.(!prev)
              return !prev
            })
          }}
        >
          <div className="items-center justify-between w-full gap-8 h-stack">
            <div className="w-full">{props.titleComponent} </div>
            {isVisible ? (
              <FaChevronUp className=" text-grey-200" />
            ) : (
              <FaChevronDown className=" text-grey-200" />
            )}
          </div>
        </div>
        {isVisible && props.children}
      </VStack>
    )
  }
)
