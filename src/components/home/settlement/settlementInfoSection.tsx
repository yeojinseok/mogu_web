'use client'
import Star from '@public/bank/NH투자증권.svg'
import { Input } from '@/components/common/Input'
import { Input2 } from '@/components/common/Input2'
import { settlementInfoState } from '@/recoil/settlementInfo'
import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import Sheet, { SheetRef } from 'react-modal-sheet'
import Image from 'next/image'
import { BANK_CODE_LIST } from '@/consts/bankCodeList'
import { hangulIncludes } from '@toss/hangul'
import { getBackTitleFromCode } from '@/utils/helper'
import { 계좌번호_유효성_검사 } from '@/consts/regex'
import Link from 'next/link'
import { Button } from '@/components/common/Button'
import { homeRoute } from '@/router/home'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '@/axios/axiosInstance'
import { useSession } from 'next-auth/react'
import { settlementStageListState } from '@/recoil/settlementStage'
import { SettlementFriendsType } from '../../../../types/settlementType'

type CreateSettlementType = {
  bankCode: string
  accountName: string
  accountNumber: string
  message: string
  userId: number
  settlementImages?: string[]
  settlementStage: {
    level: number
    totalPrice: number
    participants: SettlementFriendsType[]
  }[]
}

export default function SettlementInfoSection() {
  const session = useSession()

  const { mutate } = useMutation((data: CreateSettlementType) =>
    axiosInstance
      .post(`/settlements/users/${session.data?.userId}`, data)
      .then(v => v.data)
  )

  const [settlementInfo, setSettlementInfo] =
    useRecoilState(settlementInfoState)

  const stageList = useRecoilValue(settlementStageListState)

  const [isOpen, setIsOpen] = useState(false)

  const openSheet = () => {
    setIsOpen(true)
  }

  const closeSheet = () => {
    setIsOpen(false)
  }

  return (
    <>
      <div className="gap-48 px-16 pt-24 v-stack">
        <div className="v-stack">
          <div className="mb-8 title_section">계좌정보</div>

          <Input2
            onClick={e => {
              e.preventDefault()
              openSheet()
            }}
            value={getBackTitleFromCode(settlementInfo.bankCode)}
            placeholder="은행을 선택해주세요"
          />

          <Input2
            value={settlementInfo.accountName}
            onChange={e => {
              setSettlementInfo(prev => ({
                ...prev,
                accountName: e.target.value,
              }))
            }}
            placeholder="계좌주 이름을 입력해주세요"
          />
          <Input2
            onChange={e => {
              const value = 계좌번호_유효성_검사.test(e.target.value)
                ? e.target.value
                : ''

              setSettlementInfo(prev => ({
                ...prev,
                accountNumber: value,
              }))
            }}
            value={settlementInfo.accountNumber}
            placeholder="계좌번호를 입력해주세요"
          />
        </div>

        <div className="v-stack">
          <div className="mb-8 title_section">메시지</div>

          <Input2
            value={settlementInfo.message}
            onChange={e => {
              setSettlementInfo(prev => ({
                ...prev,
                message: e.target.value,
              }))
            }}
            placeholder="메시지를 입력해주세요"
          />
        </div>
      </div>
      <BankCodeBottomSheet isOpen={isOpen} closeSheet={closeSheet} />
      <div className="p-16 footer">
        <Button
          onClick={() => {
            mutate({
              ...settlementInfo,
              settlementStage: stageList.map(v => {
                const { id, ...data } = v
                const data2 = v.participants.map(v => {
                  const { id, ...value } = v
                  return value
                })
                return { ...v, participants: data2 }
              }),
              userId: session.data?.userId ?? 0,
              // totalPrice: 0,
              // userId: 0,
              // settlementStage: [],
            })
          }}
        >
          정산
        </Button>
      </div>
    </>
  )
}

function BankCodeBottomSheet({
  isOpen,
  closeSheet,
}: {
  isOpen: boolean
  closeSheet: () => void
}) {
  const [settlementInfo, setSettlementInfo] =
    useRecoilState(settlementInfoState)

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
                    onClick={() => {
                      setSettlementInfo(prev => ({ ...prev, bankCode: v.code }))
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
