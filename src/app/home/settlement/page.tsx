import { Button, ButtonStyled } from '@/components/common/Button'
import Header from '@/components/common/Header'
import IntermediateCheck from '@/components/home/settlement/IntermediateCheck'
import StageListSection from '@/components/home/settlement/StageListSection'
import StageSettingSection from '@/components/home/settlement/StageSettingSection'
import SettlementInfoSection from '@/components/home/settlement/settlementInfoSection'
import { homeRoute } from '@/router/home'
import Link from 'next/link'

export default function SettlementPage(props: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const step = props.searchParams['step'] ?? '1'

  return (
    <div className="">
      {step === '1' ? (
        <>
          <Header title="정산하기" />
          <IntermediateCheck />
          <div className="h-full px-16 v-stack">
            <StageListSection />
            <StageSettingSection />
          </div>
          <div className="p-16 footer">
            <Link href={homeRoute.settlement('2')}>
              <Button>다음</Button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <Header />

          <SettlementInfoSection />
          <div className="p-16 footer">
            <Link href={homeRoute.settlement('2')}>
              <Button>다음</Button>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
