'use client'
import { SnackbarProvider as Provider } from 'notistack'
import React from 'react'
export default function SnackbarProvider({
  children,
}: {
  children: React.ReactElement
}) {
  return <Provider autoHideDuration={1500}>{children}</Provider>
}
