import { VStack } from '@/components/common/Stack'

import Profile from './_components/Profile'
import Header from '@/components/common/Header'

export default function Page() {
  return (
    <VStack className="w-full h-full">
      <Header />
      <Profile />
    </VStack>
  )
}
