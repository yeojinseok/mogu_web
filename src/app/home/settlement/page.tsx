import { ButtonStyled } from '@/components/common/Button'
import Header from '@/components/common/Header'
import IntermediateCheck from '@/components/home/settlement/IntermediateCheck'
import StageListSection from '@/components/home/settlement/StageListSection'
import StageSettingSection from '@/components/home/settlement/StageSettingSection'

export default function SettlementPage() {
  return (
    <div className="">
      <Header title="정산하기" />
      <IntermediateCheck />
      <div className="h-full px-16 v-stack">
        <StageListSection />
        <StageSettingSection />
      </div>
      <div className="p-16 footer">
        <ButtonStyled type="submit">다음</ButtonStyled>
      </div>
    </div>
  )
}
