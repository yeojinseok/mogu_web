import Header from '@/components/common/Header'
import { VStack } from '@/components/common/Stack'
import SettlementDetailInfoSection from '@/components/settlement/SettlementDetailInfoSection'

export default function Page({}: { params: { userID: string } }) {
  return (
    <VStack className="w-full h-full">
      <Header />
      <SettlementDetailInfoSection />
    </VStack>
  )
}
