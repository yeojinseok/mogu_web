'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const CACHE_TIME = 1000 * 60 * 60 * 24 // 24 hours

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: CACHE_TIME,
      suspense: true,
    },
  },
})

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactElement
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
