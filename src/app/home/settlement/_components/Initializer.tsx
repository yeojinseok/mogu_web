'use client'

import { settlementInfoState } from '@/recoil/settlementInfo'
import { settlementStageListState } from '@/recoil/settlementStage'
import { useEffect } from 'react'
import { useResetRecoilState } from 'recoil'

export default function Initializer() {
  const resetSettlementInfo = useResetRecoilState(settlementInfoState)
  const resetSettlementStateList = useResetRecoilState(settlementStageListState)

  useEffect(() => {
    resetSettlementStateList()
    resetSettlementInfo()
  }, [])
  return <></>
}
