import { atom } from 'recoil'
import { SettlementInfoType } from '../../types/settlementType'

export const settlementInfoState = atom<SettlementInfoType>({
  key: 'settlementInfo',
  default: {
    bankCode: '',
    accountName: '',
    accountNumber: '',
    message: '',
  },
})
