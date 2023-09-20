'use client'

import React, { useEffect, useState } from 'react'
import tw, { styled } from 'twin.macro'

interface InputProps {
  options: {}
  showLabel: boolean
}

const InputStyled = styled.input<InputProps>`
  ${tw`w-full px-16 py-12 border-1 rounded-12 title_subsection h-78 border-grey-200 focus:outline-focus_green`}
  ${props => (props.showLabel ? tw`pt-38` : undefined)}
`

export const Select = React.forwardRef<
  HTMLDivElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Select(props, ref) {
  return <div ref={ref} className="relative"></div>
})
