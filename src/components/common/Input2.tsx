'use client'

import React, { useState } from 'react'
import tw, { styled } from 'twin.macro'

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: 'sm' | 'default' | 'lg'
}

const LargeInputStyled = styled.input`
  ${tw`w-full pt-16 pb-8 border-b-1 title_screen h-62 border-grey-200 outline-0 focus:border-focus_green focus:border-b-2 disabled:bg-white`}
`
const SmallInputStyled = styled.input`
  ${tw`h-24 title_body outline-0 disabled:bg-white`}
`
const InputStyled = styled.input`
  ${tw`w-full pt-16 pb-8 border-b-1 title_subsection h-62 border-grey-200 outline-0 focus:border-focus_green focus:border-b-2 disabled:bg-white`}
`

export const Input2 = React.forwardRef<HTMLInputElement, CustomInputProps>(
  function Input2(props, ref) {
    if (props.inputSize === 'sm') {
      return (
        <SmallInputStyled
          inputSize={props.inputSize ?? 'default'}
          ref={ref}
          {...props}
          value={props.value}
        />
      )
    }

    if (props.inputSize === 'lg') {
      return (
        <LargeInputStyled
          inputSize={props.inputSize ?? 'default'}
          ref={ref}
          {...props}
          value={props.value}
        />
      )
    }
    return (
      <InputStyled
        inputSize={props.inputSize ?? 'default'}
        ref={ref}
        {...props}
        value={props.value}
      />
    )
  }
)
