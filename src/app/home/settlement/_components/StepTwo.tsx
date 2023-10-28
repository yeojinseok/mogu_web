'use client'
import Header from '@/components/common/Header'
import SettlementInfoSection from '@/components/home/settlement/settlementInfoSection'
import useQueryParams from '@/hook/useQueryParams'

export default function StepTwo() {
  const { setQueryParams } = useQueryParams()
  return (
    <>
      <Header onClickBackButton={() => setQueryParams({ step: 1 })} />
      <SettlementInfoSection />
    </>
  )
}
