import { Button, ButtonStyled } from '@/components/common/Button'
import Header from '@/components/common/Header'
import IntermediateCheck from '@/components/home/settlement/IntermediateCheck'
import StageListSection from '@/components/home/settlement/StageListSection'
import StageSettingSection from '@/components/home/settlement/StageSettingSection'
import SettlementInfoSection from '@/components/home/settlement/settlementInfoSection'
import { homeRoute } from '@/router/home'
import Link from 'next/link'
import Initializer from './_components/Initializer'
import NextButton from './_components/NextButton'

export default function SettlementPage(props: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const step = props.searchParams['step'] ?? '1'

  return (
    <div className="">
      {step === '1' ? (
        <>
          <Initializer />
          <Header title="정산하기" />
          <IntermediateCheck />
          <div className="h-full px-16 v-stack">
            <StageListSection />
            <StageSettingSection />
          </div>

          <NextButton />
        </>
      ) : (
        <>
          <Header />
          <SettlementInfoSection />
        </>
      )}
    </div>
  )
}
