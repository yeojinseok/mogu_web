'use client'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import React, { useState } from 'react'

interface CustomDivProps extends React.HTMLProps<HTMLDivElement> {
  titleComponent: React.ReactNode
}

export const Collapsible = React.forwardRef<HTMLDivElement, CustomDivProps>(
  function Collapsible(props, ref) {
    const [isVisible, setIsVisible] = useState(false)

    return (
      <>
        <div ref={ref} onClick={() => setIsVisible(prev => !prev)}>
          <div className="items-center justify-between gap-8 h-stack">
            <div className="w-full">{props.titleComponent} </div>
            {isVisible ? (
              <FaChevronUp className=" text-grey-200" />
            ) : (
              <FaChevronDown className=" text-grey-200" />
            )}
          </div>
        </div>
        {isVisible && props.children}
      </>
    )
  }
)
