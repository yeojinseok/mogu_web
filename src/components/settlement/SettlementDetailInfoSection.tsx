'use client'
import tw from 'twin.macro'
import { HStack, VStack } from '../common/Stack'
import { Typography } from '../common/Typography'
import { useSuspenseQuery } from '@suspensive/react-query'
import {
  useGetSettlementDetail,
  useSuspenseGetSettlementDetail,
} from '@/hook/react-query/settlement/useGetSettlementDetail'
import { usePathname, useRouter } from 'next/navigation'
import { addComma, getBackTitleFromCode } from '@/utils/helper'
import { Collapsible } from '../common/Collapsible'
import React, { Suspense, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import {
  currentSelectedStageLevelStage,
  settlementStageListState,
  settlementStageState,
} from '@/recoil/settlementStage'
import { Chip } from '../common/Chip'
import { formatToKRW } from '@toss/utils'
import { compact } from 'lodash'

import Sheet, { SheetRef } from 'react-modal-sheet'
import { Input2 } from '../common/Input2'
import { BANK_CODE_LIST } from '@/consts/bankCodeList'
import { hangulIncludes } from '@toss/hangul'
import Image from 'next/image'
import { Button } from '../common/Button'
import { useSnackbar } from 'notistack'
import useUser from '@/hook/useUser'

export default function SettlementDetailInfoSection() {
  const path = usePathname()

  const { enqueueSnackbar } = useSnackbar()

  const settlementID = Number(path.split('/').slice(-1)[0] ?? '0')

  const user = useUser()

  const [isOpenEditSheet, setIsOpenEditSheet] = useState(false)

  const { data: settlement } = useGetSettlementDetail(settlementID)

  return (
    <>
      <VStack className="h-full px-16">
        <HStack className="items-center justify-between ">
          <Typography twStyle={tw`title_screen`}>정산내역</Typography>
          {user.userId === settlement?.data.userId && (
            <Typography
              onClick={() => setIsOpenEditSheet(true)}
              twStyle={tw`underline title_body`}
            >
              정산 내역 수정
            </Typography>
          )}
        </HStack>
        <Suspense fallback={<>loading...</>}>
          <AccountSection />
          <StageList />
          <PriceSection />
          <FriendsList />
        </Suspense>
      </VStack>
      <div className="p-16 footer">
        <Button
          onClick={() => {
            if (!window.navigator.share) {
              window.navigator.clipboard
                .writeText(window.location.href)
                .then(v =>
                  enqueueSnackbar('복사 되었습니다.', { variant: 'success' })
                )
            }
          }}
        >
          공유
        </Button>
      </div>
      <SettlementEditBottomSheet
        isOpen={isOpenEditSheet}
        closeSheet={() => setIsOpenEditSheet(false)}
      />
    </>
  )
}

function AccountSection() {
  const path = usePathname()

  const user = useUser()

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
            user.userId === settlement.data.userId ? (
              <Typography twStyle={tw`underline`}>수정</Typography>
            ) : null
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
    ? settlement.data.settlementStages.reduce(
        (acc, curr) => curr.totalPrice + acc,
        0
      )
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
            key={friendName}
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
                  <div
                    key={friend.level}
                    className="justify-between h-stack body_default_bold"
                  >
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

function SettlementEditBottomSheet({
  isOpen,
  closeSheet,
}: {
  isOpen: boolean
  closeSheet: () => void
}) {
  const ref = React.useRef<SheetRef>()

  const path = usePathname()

  const settlementID = Number(path.split('/').slice(-1)[0] ?? '0')

  const { data: settlement } = useSuspenseGetSettlementDetail(settlementID)

  const [editSettlement, setEditSettlement] = useState(settlement)
  const [open, setOpen] = useState(false)

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
            <VStack className="gap-24 px-20">
              <VStack>
                <Typography twStyle={tw` title_subsection`}>
                  계좌정보
                </Typography>
                <Input2
                  onClick={e => {
                    e.preventDefault()
                    setOpen(true)
                  }}
                  value={getBackTitleFromCode(editSettlement.data.bankCode)}
                  placeholder="은행을 선택해주세요"
                />
                <Input2
                  value={editSettlement.data.accountNumber}
                  inputSize={'default'}
                  placeholder="계좌번호"
                />
              </VStack>

              <VStack>
                <Typography twStyle={tw` title_subsection`}>메시지</Typography>
                <Input2
                  value={editSettlement.data.message}
                  inputSize={'default'}
                  placeholder="메시지"
                />
              </VStack>
            </VStack>
          </Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={() => closeSheet()} />
      <BankCodeBottomSheet isOpen={open} closeSheet={() => setOpen(false)} />
    </Sheet>
  )
}

function BankCodeBottomSheet({
  isOpen,
  closeSheet,
}: {
  isOpen: boolean
  closeSheet: () => void
}) {
  const [searchKeyword, setSearchKeyword] = useState('')
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
            <div className="gap-32 px-20 v-stack">
              <div className=" v-stack">
                <div className=" title_subsection">은행</div>
                <Input2
                  value={searchKeyword}
                  onChange={e => setSearchKeyword(e.target.value)}
                  placeholder="은행을 검색해보세요"
                />
              </div>
              <div className="grid grid-cols-2 pb-20 gap-y-20">
                {BANK_CODE_LIST.filter(bank =>
                  hangulIncludes(bank.title, searchKeyword)
                ).map(v => (
                  <div
                    key={v.code}
                    onClick={() => {
                      // setSettlementInfo(prev => ({ ...prev, bankCode: v.code }))
                      closeSheet()
                    }}
                    className="items-center h-stack gap-x-8"
                  >
                    {v.title}
                    <Image alt={v.title} width={20} height={20} src={v.path} />
                  </div>
                ))}
              </div>
            </div>
          </Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={() => closeSheet()} />
    </Sheet>
  )
}
