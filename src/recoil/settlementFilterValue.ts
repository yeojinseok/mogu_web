import dayjs, { Dayjs } from 'dayjs'
import { atom } from 'recoil'

type SettlementFilterValueType = {
  page: number
  limit: number
  startDate: Dayjs
  endDate: Dayjs
}

export const settlementFilterValue = atom<SettlementFilterValueType>({
  key: 'settlementFilterValue',
  default: {
    page: 1,
    limit: 20,
    startDate: dayjs().subtract(3, 'M'),
    endDate: dayjs(),
  },
})
