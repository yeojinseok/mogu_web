'use client'

import React, { EventHandler, useCallback, useState } from 'react'
import tw, { styled } from 'twin.macro'
import { debounce } from 'lodash'

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

export const ButtonStyled = styled.button`
  ${tw`flex items-center justify-center w-full bg-lime-500 h-52 title_body rounded-8`}
  ${props => (props.disabled ? tw`bg-grey-100 text-grey-200` : undefined)}
`

export const Button = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  function Button(props, ref) {
    const handleClick = useCallback(
      debounce((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        props.onClick?.(e)
      }, 100), // 1000ms 디바운스 시간
      [props.onClick]
    )

    return (
      <ButtonStyled {...props} ref={ref} onClick={handleClick}>
        {props.children}
      </ButtonStyled>
    )
  }
)

export const StickyButton = React.forwardRef<
  HTMLButtonElement,
  CustomButtonProps
>(function StickyButton(props, ref) {
  const handleClick = useCallback(
    debounce((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      props.onClick?.(e)
    }, 100), // 1000ms 디바운스 시간
    [props.onClick]
  )

  return (
    <div>
      <div className="h-90 ">
        <div className="fixed bottom-0 left-0 flex justify-center w-full p-16">
          <div className="w-full max-w-screen-tablet">
            <ButtonStyled {...props} ref={ref} onClick={handleClick}>
              {props.children}
            </ButtonStyled>
          </div>
        </div>
      </div>
    </div>
  )
})
