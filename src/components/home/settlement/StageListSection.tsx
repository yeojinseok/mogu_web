'use client'

import { Chip } from '@/components/common/Chip'
import {
  currentSelectedStageLevelStage,
  settlementStageListState,
} from '@/recoil/settlementStage'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

export default function StageListSection() {
  return (
    <div className="w-full gap-12 mt-32 overflow-x-scroll min-h-40 h-stack scrollbar-hide">
      <StageList />
      <AddStageChip />
    </div>
  )
}

function StageList() {
  const stageList = useRecoilValue(settlementStageListState)
  const [currentSelectedStageLevel, setCurrentSelectedStageLevel] =
    useRecoilState(currentSelectedStageLevelStage)

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
    useRecoilState(currentSelectedStageLevelStage)

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

  return <Chip title="차슈 추가" onClick={addStage} />
}
