'use client'
import React from 'react'
import { TwStyle } from 'twin.macro'

interface CustomSpanProps extends React.HTMLProps<HTMLSpanElement> {
  twStyle: TwStyle
}
/**
 * 서버 컴포넌트에서 TW를 사용하기 위해 랩핑한 컴포넌트
 */
export const Typography = React.forwardRef<HTMLSpanElement, CustomSpanProps>(
  function Typography(props, ref) {
    return <span ref={ref} {...props} css={props.twStyle}></span>
  }
)
