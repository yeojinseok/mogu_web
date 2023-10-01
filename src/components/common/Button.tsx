'use client'

import React, { EventHandler, useState } from 'react'
import tw, { styled } from 'twin.macro'
import { debounce } from 'lodash'

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

export const ButtonStyled = styled.button`
  ${tw`flex items-center justify-center w-full bg-lime-500 h-52 title_body rounded-8`}
`

export const Button = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  function Button(props, ref) {
    const debounceCallback = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      debounce(() => props.onClick?.(e), 100)
    }

    return (
      <ButtonStyled ref={ref} onClick={debounceCallback}>
        {props.children}
      </ButtonStyled>
    )
  }
)
