'use client'
import tw from 'twin.macro'
import { HStack, VStack } from '../common/Stack'
import { Typography } from '../common/Typography'
import { useSuspenseQuery } from '@suspensive/react-query'
import { useSuspenseGetSettlementDetail } from '@/hook/react-query/settlement/useGetSettlementDetail'
import { usePathname, useRouter } from 'next/navigation'
import { addComma, getBackTitleFromCode } from '@/utils/helper'
import { Collapsible } from '../common/Collapsible'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import {
  currentSelectedStageLevelStage,
  settlementStageListState,
  settlementStageState,
} from '@/recoil/settlementStage'
import { Chip } from '../common/Chip'
import { formatToKRW } from '@toss/utils'
import { compact } from 'lodash'

export default function SettlementDetailInfoSection() {
  const router = useRouter()
  const path = usePathname()

  const settlementID = Number(path.split('/').slice(-1)[0] ?? '0')

  const { data: settlement } = useSuspenseGetSettlementDetail(settlementID)

  useEffect(() => {})
  return (
    <VStack className="px-16">
      <HStack className="items-center justify-between ">
        <Typography twStyle={tw`title_screen`}>정산내역</Typography>
        <Typography twStyle={tw`underline title_body`}>
          정산 내역 수정
        </Typography>
      </HStack>
      <AccountSection />
      <StageList />
      <PriceSection />
      <FriendsList />
    </VStack>
  )
}

function AccountSection() {
  const path = usePathname()

  const settlementID = Number(path.split('/').slice(-1)[0] ?? '0')

  const { data: settlement } = useSuspenseGetSettlementDetail(settlementID)

  const [isOpenToggle, setOpenToggle] = useState(false)

  return (
    <HStack className="p-16 mt-12 bg-lime-50 rounded-8">
      <Collapsible
        initToggleState={isOpenToggle}
        onToggle={setOpenToggle}
        titleComponent={
          isOpenToggle ? (
            <Typography twStyle={tw`underline`}>수정</Typography>
          ) : (
            <HStack className="justify-between w-full">
              <Typography twStyle={tw`text-grey-700 body_large_bold`}>
                {getBackTitleFromCode(settlement.data.bankCode)}{' '}
                {settlement.data.accountNumber}
              </Typography>
              <Typography twStyle={tw`text-grey-700 body_large_bold`}>
                {settlement.data.accountName}
              </Typography>
            </HStack>
          )
        }
      >
        <VStack className="w-full pt-8">
          <HStack className="justify-between w-full">
            <Typography twStyle={tw`text-grey-700 body_large_bold`}>
              {getBackTitleFromCode(settlement.data.bankCode)}{' '}
              {settlement.data.accountNumber}
            </Typography>
            <Typography twStyle={tw`text-grey-700 body_large_bold`}>
              {settlement.data.accountName}
            </Typography>
          </HStack>
          <Typography twStyle={tw`body_large text-grey-700`}>
            {settlement.data.message}
          </Typography>
        </VStack>
      </Collapsible>
    </HStack>
  )
}

function StageList() {
  const path = usePathname()

  const settlementID = Number(path.split('/').slice(-1)[0] ?? '0')

  const { data: settlement } = useSuspenseGetSettlementDetail(settlementID)

  const [currentSelectedStageLevel, setCurrentSelectedStageLevel] =
    useRecoilState(currentSelectedStageLevelStage)

  return (
    <HStack className="gap-12 mt-32">
      <Chip
        variants="default"
        onClick={() => {
          setCurrentSelectedStageLevel(0)
        }}
        active={currentSelectedStageLevel === 0}
        title="전체"
      />
      {settlement.data.settlementStages.map(stage => (
        <Chip
          variants="default"
          key={stage.level}
          onClick={() => {
            setCurrentSelectedStageLevel(stage.level)
          }}
          active={currentSelectedStageLevel === stage.level}
          title={`${stage.level}차`}
        />
      ))}
    </HStack>
  )
}

function PriceSection() {
  const path = usePathname()

  const settlementID = Number(path.split('/').slice(-1)[0] ?? '0')

  const { data: settlement } = useSuspenseGetSettlementDetail(settlementID)

  const [currentSelectedStageLevel, setCurrentSelectedStageLevel] =
    useRecoilState(currentSelectedStageLevelStage)

  const isSelectedAll = currentSelectedStageLevel === 0

  const totalPrice = isSelectedAll
    ? settlement.data.totalPrice
    : settlement.data.settlementStages.find(
        v => v.level === currentSelectedStageLevel
      )?.totalPrice ?? 0

  return (
    <HStack className="items-end gap-12 mt-24">
      <Typography twStyle={tw`title_screen`}>
        {addComma(totalPrice)}원
      </Typography>
      <Typography twStyle={tw`pb-8 body_default text-grey-700`}>
        {formatToKRW(totalPrice)}
      </Typography>
    </HStack>
  )
}

function FriendsList() {
  const path = usePathname()

  const settlementID = Number(path.split('/').slice(-1)[0] ?? '0')

  const { data: settlement } = useSuspenseGetSettlementDetail(settlementID)

  const [currentSelectedStageLevel, setCurrentSelectedStageLevel] =
    useRecoilState(currentSelectedStageLevelStage)

  const isSelectedAll = currentSelectedStageLevel === 0

  const friendNameList = isSelectedAll
    ? [
        ...settlement.data.settlementStages.reduce((acc, curr) => {
          curr.participants.forEach(friend => acc.add(friend.name))
          return acc
        }, new Set<string>()),
      ]
    : settlement.data.settlementStages
        .find(v => v.level === currentSelectedStageLevel)
        ?.participants.map(v => v.name) ?? []

  const getFriendInfoFromName = (name: string) => {
    return compact(
      settlement.data.settlementStages.map(v => {
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
    <VStack className="gap-16">
      <HStack className="items-end gap-8 mt-24">
        <Typography twStyle={tw`title_subsection`}>친구별 정산금액</Typography>
        <Typography twStyle={tw`text-orange-500 title_body`}>
          {friendNameList.length}명
        </Typography>
      </HStack>
      <VStack className="gap-12">
        {friendNameList.map(friendName => (
          <Collapsible
            titleComponent={
              <div className="justify-between h-stack body_large_bold">
                <div>{friendName}</div>
                <div>
                  {addComma(
                    isSelectedAll
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
            <div className="gap-8 px-16 py-12 mt-8 rounded-8 v-stack bg-grey-50">
              {getFriendInfoFromName(friendName).map(friend => {
                return (
                  <div className="justify-between h-stack body_default_bold">
                    <div className="gap-20 h-stack">
                      <div className=" min-w-30">{friend.level}차</div>
                      <div>{friend.settlementType}</div>
                    </div>
                    <div>{addComma(friend.price)}원</div>
                  </div>
                )
              })}
            </div>
          </Collapsible>
        ))}
      </VStack>
    </VStack>
  )
}
