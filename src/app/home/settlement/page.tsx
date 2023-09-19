import Header from '@/components/common/Header'
import IntermediateCheck from '@/components/home/settlement/IntermediateCheck'
import StageListSection from '@/components/home/settlement/StageListSection'
import StageSettingSection from '@/components/home/settlement/StageSettingSection'

export default function SettlementPage() {
  return (
    <div className="container ">
      <Header title="정산하기" />
      <IntermediateCheck />
      <div className="h-full px-16 v-stack">
        <StageListSection />
        <StageSettingSection />
      </div>
    </div>
  )
}
