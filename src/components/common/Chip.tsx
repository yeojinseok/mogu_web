'use client'

import React, { EventHandler, useCallback, useState } from 'react'
import tw, { TwStyle, styled } from 'twin.macro'
import { debounce } from 'lodash'

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  variants?: 'default' | 'primary'
  title: string
  size?: 'small' | 'default'
}

export const ChipStyled = styled.button<{
  active: boolean
  activeColor?: TwStyle
  inactiveColor?: TwStyle
}>`
  ${tw`items-center justify-center h-40 px-20 py-8 title_body border-1 rounded-99 shrink-0`}
  ${theme => (theme.active ? theme.activeColor : theme.inactiveColor)}
`

export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  function Chip(props, ref) {
    const handleClick = useCallback(
      debounce((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        props.onClick?.(e)
      }, 100), // 1000ms 디바운스 시간
      [props.onClick]
    )
    return (
      <ChipStyled
        active={props.active ?? false}
        ref={ref}
        onClick={handleClick}
        activeColor={
          props.variants === 'default'
            ? tw`bg-grey-900 text-grey-50 `
            : tw`text-white bg-lime-500 `
        }
        inactiveColor={
          props.variants === 'default'
            ? undefined
            : tw`bg-grey-50 text-grey-900 `
        }
        css={[
          props.variants === 'primary' ? tw`border-0` : undefined,
          props.size === 'small' ? tw`body_large` : undefined,
        ]}
      >
        {props.title}
      </ChipStyled>
    )
  }
)
