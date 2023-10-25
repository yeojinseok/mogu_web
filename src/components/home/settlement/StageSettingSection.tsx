'use client'
import { Input2 } from '@/components/common/Input2'
import {
  currentSelectedStageLevelStage,
  settlementFriendFromID,
  settlementFriendsState,
  settlementStageState,
  settlementTotalPriceState,
} from '@/recoil/settlementStage'
import { useRecoilState, useRecoilValue } from 'recoil'

import { Select } from '@/components/common/Select'

import { clamp } from '@toss/utils'
import { forEach, isNaN } from 'lodash'
import MoguSelect from '@/components/common/MoguSelect'
import tw from 'twin.macro'
import { useEffect } from 'react'
import { addComma } from '@/utils/helper'
import { generateSecureID } from '@/utils/generateSecureID'
import { SETTLEMENT_STATE_LIST } from '@/consts/data'

export default function StageSettingSection() {
  return (
    <>
      <TotalPrice />
      <FriendListSection />
    </>
  )
}

function TotalPrice() {
  const currentSelectedStageLevel = useRecoilValue(
    currentSelectedStageLevelStage
  )

  const [price, setPrice] = useRecoilState(
    settlementTotalPriceState(currentSelectedStageLevel)
  )
  return (
    <div className="mt-20">
      <Input2
        inputSize="lg"
        placeholder="얼마를 정산할까요?"
        value={addComma(price)}
        onChange={e => {
          const { value } = e.target
          const price = value.replaceAll(',', '')

          if (!Number(price) && value !== '') {
            return
          }

          setPrice(clamp(Number(price), 0, 10000000))
        }}
      />
    </div>
  )
}

function FriendListSection() {
  return (
    <div className="h-full mt-40 v-stack">
      <FriendListHeader />
      <FriendList />
    </div>
  )
}

function FriendListHeader() {
  const currentSelectedStageLevel = useRecoilValue(
    currentSelectedStageLevelStage
  )

  const [friends, setFriends] = useRecoilState(
    settlementFriendsState(currentSelectedStageLevel)
  )

  const addFriends = () => {
    setFriends(prev =>
      prev.concat([
        {
          id: generateSecureID(),
          name: '',
          price: 0,
          priority: prev.length + 1,
        },
      ])
    )
  }
  return (
    <div className="items-center justify-between h-stack">
      <div className="items-center gap-8 h-stack">
        <div className=" title_section">친구 리스트</div>
        <div className="text-orange-500 title_subsection">
          {friends.length}명
        </div>
      </div>

      <div onClick={addFriends} className="underline hover:cursor-pointer">
        친구추가
      </div>
    </div>
  )
}

function FriendList() {
  const currentSelectedStageLevel = useRecoilValue(
    currentSelectedStageLevelStage
  )

  const friends = useRecoilValue(
    settlementFriendsState(currentSelectedStageLevel)
  )
  return (
    <div className="w-full h-full gap-20 pt-20 overflow-y-scroll v-stack">
      {friends.map(v => (
        <FriendItem key={v.id} id={v.id} />
      ))}
    </div>
  )
}

function FriendItem({ id }: { id: number }) {
  const currentSelectedStageLevel = useRecoilValue(
    currentSelectedStageLevelStage
  )

  const totalPrice = useRecoilValue(
    settlementTotalPriceState(currentSelectedStageLevel)
  )

  const [friends, setFriends] = useRecoilState(
    settlementFriendsState(currentSelectedStageLevel)
  )

  const 특정금액_빼고_남은_금액 = friends.reduce((prev, curr) => {
    if (curr.settlementType === 'SPECIFIC_PRICE' && curr.id !== id) {
      return prev - curr.price
    }
    return prev
  }, totalPrice)

  const 퍼센트금액_빼고_남은_금액 = friends.reduce((prev, curr) => {
    if (curr.settlementType === 'PERCENT' && curr.id !== id) {
      return prev - curr.price
    }
    return prev
  }, 특정금액_빼고_남은_금액)

  const remainingPercent = friends.reduce((prev, curr) => {
    if (curr.settlementType === 'PERCENT' && curr.id !== id) {
      return prev - (curr.percentage ?? 0)
    }
    return prev
  }, 100)

  const friendsLength = friends.filter(
    v => v.settlementType === 'DUTCH_PAY'
  ).length

  const [friend, setFriend] = useRecoilState(
    settlementFriendFromID({ level: currentSelectedStageLevel, id: id })
  )

  useEffect(() => {
    switch (friend.settlementType) {
      case 'PERCENT': {
        setFriend(prev => ({
          ...prev,
          price: (특정금액_빼고_남은_금액 * (prev.percentage ?? 0)) / 100,
        }))
        break
      }
      case 'SPECIFIC_PRICE': {
        setFriend(prev => ({
          ...prev,
          price: clamp(Number(prev.price), 0, 특정금액_빼고_남은_금액),
        }))
        break
      }
      case 'DUTCH_PAY': {
        setFriend(prev => ({
          ...prev,
          price:
            퍼센트금액_빼고_남은_금액 /
            friends.filter(v => v.settlementType === 'DUTCH_PAY').length,
        }))
        break
      }
    }
  }, [
    특정금액_빼고_남은_금액,
    totalPrice,
    remainingPercent,
    퍼센트금액_빼고_남은_금액,
    friend.settlementType,
    friendsLength,
  ])

  return (
    <div className="h-stack">
      <div className="justify-between w-full h-stack">
        <div className="items-center h-stack gap-23 ">
          <Input2
            value={friend.name}
            onChange={e =>
              setFriend(prev => ({ ...prev, name: e.target.value }))
            }
            className="text-center w-63"
            inputSize="sm"
            placeholder="이름"
          />

          <div className="flex items-center justify-between w-104">
            {friend.settlementType === 'PERCENT' ? (
              <Input2
                value={friend.percentage ?? 0}
                onChange={e => {
                  const { value } = e.target

                  if (isNaN(Number(value))) {
                    return
                  }

                  const percent = clamp(Number(value), 0, remainingPercent)

                  setFriend(prev => ({
                    ...prev,
                    percentage: percent,
                    price: (특정금액_빼고_남은_금액 * percent) / 100,
                  }))
                }}
                className="text-center w-63"
                inputSize="sm"
                placeholder="% 입력"
              />
            ) : (
              <div
                css={friend.settlementType ? undefined : tw`text-grey-100`}
                className=" title_body"
              >
                {SETTLEMENT_STATE_LIST.find(
                  v => v.value === friend.settlementType
                )?.label ?? '타입선택'}
              </div>
            )}

            <MoguSelect
              options={SETTLEMENT_STATE_LIST}
              onChange={v =>
                setFriend(prev => ({ ...prev, settlementType: v }))
              }
            />
          </div>
        </div>
        <div className="items-center h-stack">
          <Input2
            disabled={friend.settlementType !== 'SPECIFIC_PRICE'}
            value={addComma(friend.price)}
            onChange={e => {
              const { value } = e.target
              const price = value.replaceAll(',', '').replace('원', '')

              if (!Number(price) && value !== '') {
                return
              }

              setFriend(prev => ({
                ...prev,
                price: clamp(Number(price), 0, 특정금액_빼고_남은_금액),
              }))
            }}
            className="text-center w-63"
            inputSize="sm"
            style={{
              textAlign: 'right',
            }}
          />
          <div className=" title_body">원</div>
        </div>
      </div>
    </div>
  )
}

// function useSettingSettlement(){
//   const currentSelectedStageLevel = useRecoilValue(
//     currentSelectedStageLevelStage
//   )

//   const [settlement, setSettlement] = useRecoilState(
//     settlementStageState(currentSelectedStageLevel)
//   )

//   const update = () =>{
//     setSettlement(prev => {
//       let settlementPrice = prev.totalPrice

//       forEach(prev.friends.filter(v => v.settlementType === 'SPECIFIC_PRICE'), v => {
//         settlement.totalPrice - v.price
//       })

//       const percentFriends = prev.friends.filter(v => v.settlementType === 'PERCENT').map(friend => {
//         return {
//           ...friend,
//           'price': settlementPrice *
//         }
//       })

//       const dutchFriends = prev.friends.filter(v => v.settlementType === 'DUTCH_PAY')

//       return {
//         ...prev,
//         'friends':
//       }

//     })
//   }
// }
