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
import { SettlementFriendsType } from '../../../../types/settlementStageType'
import { Select } from '@/components/common/Select'
import { v4 as uuidv4 } from 'uuid'
import { clamp } from '@toss/utils'
import { forEach } from 'lodash'
import MoguSelect from '@/components/common/MoguSelect'

const SETTLEMENT_STATE_LIST = [
  {
    id: '더치페이',
    name: '더치페이',
  },
  {
    id: '특정금액',
    name: '특정금액',
  },
  {
    id: '퍼센트',
    name: '퍼센트',
  },
]

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
      prev.concat([{ id: uuidv4(), name: '', price: 0, settlementType: '' }])
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

function FriendItem({ id }: { id: string }) {
  const currentSelectedStageLevel = useRecoilValue(
    currentSelectedStageLevelStage
  )

  const totalPrice = useRecoilValue(
    settlementTotalPriceState(currentSelectedStageLevel)
  )

  const [friend, setFriend] = useRecoilState(
    settlementFriendFromID({ level: currentSelectedStageLevel, id: id })
  )

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
          <select
            value={friend.settlementType}
            onChange={e => {
              setFriend(prev => ({ ...prev, settlementType: e.target.value }))
            }}
          >
            {SETTLEMENT_STATE_LIST.map(state => (
              <option value={state.id}>{state.name}</option>
            ))}
          </select>
          <MoguSelect />
        </div>
        <div className="items-center h-stack">
          <Input2
            disabled={friend.settlementType !== '특정금액'}
            value={addComma(friend.price)}
            onChange={e => {
              const { value } = e.target
              const price = value.replaceAll(',', '').replace('원', '')

              if (!Number(price) && value !== '') {
                return
              }

              setFriend(prev => ({
                ...prev,
                price: clamp(Number(price), 0, totalPrice),
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

const addComma = (price: number) => {
  let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return returnString
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

//       forEach(prev.friends.filter(v => v.settlementType === '특정금액'), v => {
//         settlement.totalPrice - v.price
//       })

//       const percentFriends = prev.friends.filter(v => v.settlementType === '퍼센트').map(friend => {
//         return {
//           ...friend,
//           'price': settlementPrice *
//         }
//       })

//       const dutchFriends = prev.friends.filter(v => v.settlementType === '더치페이')

//       return {
//         ...prev,
//         'friends':
//       }

//     })
//   }
// }
