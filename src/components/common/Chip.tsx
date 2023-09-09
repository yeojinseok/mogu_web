'use client'

import React, { EventHandler, useCallback, useState } from 'react'
import tw, { styled } from 'twin.macro'
import { debounce } from 'lodash'

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  title: string
}

export const ChipStyled = styled.button<{ active: boolean }>`
  ${tw`px-20 py-8 title_body border-1 rounded-99 shrink-0`}
  ${theme => (theme.active ? tw`bg-grey-900 text-grey-50 ` : undefined)}
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
      >
        {props.title}
      </ChipStyled>
    )
  }
)
