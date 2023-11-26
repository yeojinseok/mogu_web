'use client'

import React, { useState } from 'react'
import tw, { styled } from 'twin.macro'

interface InputProps {
  showLabel: boolean
  isError: boolean
}

const InputStyled = styled.input<InputProps>`
  ${tw`w-full px-16 py-12 border-1 rounded-12 title_subsection h-78`}
  ${props => (props.showLabel ? tw`pt-38` : undefined)}
  ${props =>
    props.isError
      ? tw` border-error focus:outline-error`
      : tw` border-grey-200 focus:outline-focus_green`}
`

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { errorText?: string }
>(function Input(props, ref) {
  const [isFocus, setIsFocus] = useState(false)
  const [value, setValue] = useState('')

  const showLabel = isFocus || value.length > 0

  return (
    <div className="relative ">
      <InputStyled
        value={value}
        ref={ref}
        {...props}
        placeholder={!isFocus ? props.placeholder : undefined}
        onChange={e => {
          props.onChange?.(e)
          setValue(e.target.value)
        }}
        onFocus={e => {
          props.onFocus?.(e)
          setIsFocus(true)
        }}
        onBlur={e => {
          props.onBlur?.(e)
          setIsFocus(false)
        }}
        showLabel={showLabel}
        isError={!!props.errorText}
      />
      {(isFocus || value.length > 0) && (
        <div
          css={
            !!props.errorText
              ? tw`absolute text-error top-12 left-16 body_default`
              : tw`absolute text-focus_green top-12 left-16 body_default`
          }
        >
          {props.placeholder}
        </div>
      )}
      <div className="pt-4 body_default text-error">{props.errorText}</div>
    </div>
  )
})
