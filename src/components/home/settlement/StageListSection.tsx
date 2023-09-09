'use client'

import { Chip } from '@/components/common/Chip'
import {
  currentSelectedStage,
  settlementStageListState,
} from '@/recoil/settlementStage'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { SettlementStageType } from '../../../../types/settlementStageType'

export default function StageListSection() {
  return (
    <div className="w-full gap-12 px-16 mt-32 overflow-y-scroll v-stack scrollbar-hide">
      <StageList />
      <AddStageChip />
    </div>
  )
}

function StageList() {
  const stageList = useRecoilValue(settlementStageListState)
  const [currentSelectedStageLevel, setCurrentSelectedStageLevel] =
    useRecoilState(currentSelectedStage)

  return (
    <>
      {stageList.map(stage => (
        <Chip
          key={stage.level}
          onClick={() => {
            setCurrentSelectedStageLevel(stage.level)
          }}
          active={currentSelectedStageLevel === stage.level}
          title={`${stage.level}차`}
        />
      ))}
    </>
  )
}

function AddStageChip() {
  const setStageList = useSetRecoilState(settlementStageListState)
  const [currentSelectedStageLevel, setCurrentSelectedStageLevel] =
    useRecoilState(currentSelectedStage)

  const addStage = () => {
    setCurrentSelectedStageLevel(prev => prev + 1)
    setStageList(prev =>
      prev.concat({
        level: currentSelectedStageLevel + 1,
        friends: [],
        totalPrice: 0,
      })
    )
  }

  return <Chip title="차수 추가" onClick={addStage} />
}
