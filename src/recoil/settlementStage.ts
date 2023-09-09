import { GetRecoilValue, atom, selectorFamily } from 'recoil'
import { SettlementStageType } from '../../types/settlementStageType'

export const settlementStageListState = atom<SettlementStageType[]>({
  key: 'settlementStateList',
  default: [
    {
      level: 1,
      friends: [],
      totalPrice: 0,
    },
  ],
})

export const settlementStageState = selectorFamily({
  key: 'settlementStage',
  get:
    (level: number) =>
    ({ get }: { get: GetRecoilValue }) => {
      return get(settlementStageListState).find(v => v.level === level)
    },
})

export const currentSelectedStage = atom<number>({
  key: 'currentSelectedStageState',
  default: 1,
})
