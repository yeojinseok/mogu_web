import Header from '@/components/common/Header'
import { HStack, VStack } from '@/components/common/Stack'
import useUser from '@/hook/useUser'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function Page() {
  return (
    <VStack className="w-full h-full">
      <Header />
    </VStack>
  )
}
