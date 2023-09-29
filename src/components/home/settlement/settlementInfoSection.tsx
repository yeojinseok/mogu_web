import { Input } from '@/components/common/Input'
import { Input2 } from '@/components/common/Input2'

export default function SettlementInfoSection() {
  return (
    <div className="gap-48 px-16 pt-24 v-stack">
      <div className="v-stack">
        <div className="mb-8 title_section">계좌정보</div>
        <Input2 placeholder="은행을 선택해주세요" />
        <Input2 placeholder="계좌번호를 입력해주세요" />
      </div>
    </div>
  )
}
