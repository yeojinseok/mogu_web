import {
  DefaultValue,
  GetRecoilValue,
  SetRecoilState,
  atom,
  selectorFamily,
} from 'recoil'
import { SettlementStageType } from '../../types/settlementType'

export const settlementInfoState = atom<SettlementStageType[]>({
  key: 'settlementInfo',
  default: [
    {
      level: 1,
      friends: [],
      totalPrice: 0,
    },
  ],
})
