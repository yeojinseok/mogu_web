'use client'

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
          {props.titleComponent}
        </div>
        {isVisible && props.children}
      </>
    )
  }
)
