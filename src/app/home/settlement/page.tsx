import Header from '@/components/common/Header'
import IntermediateCheck from '@/components/home/settlement/IntermediateCheck'
import StageListSection from '@/components/home/settlement/StageListSection'

export default function SettlementPage() {
  return (
    <div className="container ">
      <div className="v-Stack">
        <Header title="정산하기" />
        <IntermediateCheck />
        <StageListSection />
      </div>
    </div>
  )
}
