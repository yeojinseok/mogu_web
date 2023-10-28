'use client'
import { Chip } from '@/components/common/Chip'
import { Collapsible } from '@/components/common/Collapsible'
import {
  settlementStageListState,
  settlementStageState,
} from '@/recoil/settlementStage'
import { addComma } from '@/utils/helper'
import { formatToKRW } from '@toss/utils'
import { compact } from 'lodash'
import React, { useState } from 'react'
import Sheet, { SheetRef } from 'react-modal-sheet'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useSnackbar } from 'notistack'

export default function IntermediateCheck() {
  const { enqueueSnackbar } = useSnackbar()
  const settlementStageList = useRecoilValue(settlementStageListState)

  const isExistsSettlementList = settlementStageList.reduce(
    (acc, curr) => curr.participants.length > 0,
    false
  )

  const [isOpenSheet, setIsOpenSheet] = useState(false)

  const openSheet = () => {
    if (!isExistsSettlementList) {
      enqueueSnackbar('확인할 내역이 없어요.', { variant: 'default' })
      return
    }
    setIsOpenSheet(true)
  }

  const closeSheet = () => {
    setIsOpenSheet(false)
  }

  return (
    <>
      <div
        onClick={openSheet}
        className="items-center gap-12 px-16 py-12 bg-orange-100 h-stack hover:cursor-pointer"
      >
        <div className="gap-8 h-stack">
          <div className=" body_large_bold">중간체크</div>
        </div>
        <div className=" caption_default">
          지금까지 입력한 전체 내역을 확인할수 있어요
        </div>
      </div>
      <IntermediateCheckBottomSheet
        isOpen={isOpenSheet}
        closeSheet={closeSheet}
      />
    </>
  )
}

function IntermediateCheckBottomSheet({
  isOpen,
  closeSheet,
}: {
  isOpen: boolean
  closeSheet: () => void
}) {
  const ref = React.useRef<SheetRef>()

  return (
    <Sheet
      ref={ref}
      snapPoints={[0.9, 0.6]}
      isOpen={isOpen}
      onClose={closeSheet}
      initialSnap={1}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content style={{ paddingBottom: ref.current?.y }}>
          <Sheet.Scroller>
            <SettlementContent />
          </Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={() => closeSheet()} />
    </Sheet>
  )
}

function SettlementContent() {
  const [currentSelectedStageLevel, setCurrentSelectedStageLevel] = useState(0)

  const settlementStageList = useRecoilValue(settlementStageListState)
  const currentStage = settlementStageList.find(
    v => v.level === currentSelectedStageLevel
  )

  const isAllStageFilter = currentSelectedStageLevel === 0

  const price = isAllStageFilter
    ? settlementStageList.reduce((prev, curr) => prev + curr.totalPrice, 0)
    : currentStage?.totalPrice

  // const friends = isAllStageFilter ? settlementStageList.reduce((prev, curr) =>  curr.friends.forEach(friend => prev.) ,new Set())

  const friendNameList = isAllStageFilter
    ? [
        ...settlementStageList.reduce((acc, curr) => {
          curr.participants.forEach(friend => acc.add(friend.name))
          return acc
        }, new Set<string>()),
      ]
    : currentStage?.participants.map(v => v.name) ?? []

  const getFriendInfoFromName = (name: string) => {
    return compact(
      settlementStageList.map(v => {
        const friend = v.participants.find(v => v.name === name)
        if (!friend) {
          return
        }
        return {
          level: v.level,
          price: friend?.price,
          settlementType: friend?.settlementType,
        }
      })
    )
  }

  return (
    <div className="px-16">
      <div className="gap-24 v-stack">
        <div className="flex gap-12">
          <Chip
            onClick={() => {
              setCurrentSelectedStageLevel(0)
            }}
            active={currentSelectedStageLevel === 0}
            title="전체"
          />
          {settlementStageList.map(stage => (
            <Chip
              key={stage.level}
              onClick={() => {
                setCurrentSelectedStageLevel(stage.level)
              }}
              active={currentSelectedStageLevel === stage.level}
              title={`${stage.level}차`}
            />
          ))}
        </div>
        <div className="gap-12 h-stack">
          <div className="title_screen ">{addComma(price ?? 0)}원</div>
          <div className="flex items-end pb-8 body_default text-grey-500">
            {formatToKRW(price ?? 0)}
          </div>
        </div>

        <div className="h-stack">
          <div className="gap-8 h-stack ">
            <div className="title_section">친구 리스트</div>
            <div className="text-orange-500 title_subsection">
              {friendNameList?.length ?? 0}명
            </div>
          </div>
        </div>
        <div className="gap-12 v-stack">
          {friendNameList.map(friendName => (
            <Collapsible
              key={friendName}
              titleComponent={
                <div className="justify-between h-stack body_large_bold">
                  <div>{friendName}</div>
                  <div>
                    {addComma(
                      isAllStageFilter
                        ? getFriendInfoFromName(friendName).reduce(
                            (acc, curr) => acc + curr.price,
                            0
                          )
                        : getFriendInfoFromName(friendName).find(
                            v => v.level === currentSelectedStageLevel
                          )?.price ?? 0
                    )}
                    원
                  </div>
                </div>
              }
            >
              <div className="gap-8 px-16 py-12 rounded-8 v-stack bg-grey-50">
                {getFriendInfoFromName(friendName).map(friend => {
                  return (
                    <div
                      key={friend.level}
                      className="justify-between h-stack body_default_bold"
                    >
                      <div className="gap-20 h-stack">
                        <div>{friend.level}차</div>
                        <div>{friend.settlementType}</div>
                      </div>
                      <div>{addComma(friend.price)}원</div>
                    </div>
                  )
                })}
              </div>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  )
}
