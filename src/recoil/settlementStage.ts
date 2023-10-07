import {
  DefaultValue,
  GetRecoilValue,
  SetRecoilState,
  atom,
  selectorFamily,
} from 'recoil'
import { SettlementStageType } from '../../types/settlementType'

export const settlementStageListState = atom<SettlementStageType[]>({
  key: 'settlementStateList',
  default: [
    {
      level: 1,
      participants: [],
      totalPrice: 0,
    },
  ],
})

export const settlementStageState = selectorFamily({
  key: 'settlementStage',
  get:
    (level: number) =>
    ({ get }: { get: GetRecoilValue }) => {
      const stage = get(settlementStageListState).find(v => v.level === level)
      if (!stage) {
        throw new Error('error!')
      }
      return stage
    },
  set:
    (level: number) =>
    (
      { set }: { set: SetRecoilState },
      newValue: SettlementStageType | DefaultValue
    ) => {
      set(settlementStageListState, prev => {
        if (newValue instanceof DefaultValue) {
          return prev
        }

        const prevList = [...prev]
        const index = prevList.findIndex(v => v.level === level)
        prevList.splice(index, 1, newValue)

        return prevList
      })
    },
})

const createSettlementStageStateSpecificKeySelector = <
  T extends keyof SettlementStageType
>(
  key: T
) => {
  return selectorFamily({
    key: 'settlementState' + key,
    get:
      (level: number) =>
      ({ get }) => {
        return get(settlementStageState(level))?.[key]
      },
    set:
      (level: number) =>
      ({ set }, newValue) => {
        set(settlementStageState(level), prevState => {
          return {
            ...prevState,
            [key]: newValue,
          }
        })
      },
  })
}

export const settlementFriendFromID = selectorFamily({
  key: 'settlementFriend',
  get:
    ({ level, id }: { level: number; id: number }) =>
    ({ get }) => {
      const value = get(settlementStageState(level)).participants.find(
        v => v.id === id
      )
      if (!value) {
        throw new Error('error!')
      }
      return value
    },
  set:
    ({ level, id }: { level: number; id: number }) =>
    ({ set }, newValue) => {
      set(settlementStageListState, prev => {
        if (newValue instanceof DefaultValue) {
          return prev
        }

        const prevList = [...prev]
        const index = prevList.findIndex(v => v.level === level)

        const prevFriendsList = [...prevList[index].participants]
        const changeFriendIndex = prevFriendsList.findIndex(v => v.id === id)

        prevFriendsList.splice(changeFriendIndex, 1, newValue)

        prevList.splice(index, 1, {
          ...prevList[index],
          participants: prevFriendsList,
        })

        return prevList
      })
    },
})

export const settlementTotalPriceState =
  createSettlementStageStateSpecificKeySelector('totalPrice')

export const settlementLevelState =
  createSettlementStageStateSpecificKeySelector('level')

export const settlementFriendsState =
  createSettlementStageStateSpecificKeySelector('participants')

export const currentSelectedStageLevelStage = atom<number>({
  key: 'currentSelectedStageLevelStage',
  default: 1,
})

/**
 * 시나리오 1
 * 30000원
 * 특정금액인 친구들의 금액을 제외
 * price 변경할 때도 변경해야함
 *
 *
 */
