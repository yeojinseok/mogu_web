'use client'
import React, { useState } from 'react'
import tw, { styled } from 'twin.macro'

const VStackDiv = styled.div`
  ${tw` v-stack`}
`

const HStackDiv = styled.div`
  ${tw` h-stack`}
`

export const VStack = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(function VStack(props, ref) {
  return <VStackDiv {...props} />
})

export const HStack = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(function VStack(props, ref) {
  return <HStackDiv {...props} />
})
