'use client'
import { HStack, VStack } from '@/components/common/Stack'
import { SETTLEMENT_STATUS_MAP } from '@/consts/metadata'

import {
  SettlementListRequestType,
  SettlementResponseType,
  useSuspenseGetSettlementList,
} from '@/hook/react-query/settlement/useGetSettlementList'
import { settlementFilterValue } from '@/recoil/settlementFilterValue'
import { Date } from '@/utils/date'
import { addComma } from '@/utils/helper'
import { useRecoilValue } from 'recoil'

export default function SettlementListComponent() {
  const filterValue = useRecoilValue(settlementFilterValue)

  const request: SettlementListRequestType = {
    endDate: filterValue.endDate.format('YYYY-MM-DDTHH:mm:ssZ'),
    startDate: filterValue.startDate.format('YYYY-MM-DDTHH:mm:ssZ'),
    page: 0,
    limit: 10,
  }
  const { data } = useSuspenseGetSettlementList(request)
  return (
    <VStack className="h-full overflow-y-scroll ">
      {data.data.settlements.map(settlement => (
        <ListItem settlement={settlement} />
      ))}
    </VStack>
  )
}

function ListItem({ settlement }: { settlement: SettlementResponseType }) {
  return (
    <VStack className="gap-4 px-16 py-20 border-b-1 border-b-grey-50">
      <HStack className="justify-between ">
        <div className=" title_subsection">title</div>
        <div className=" title_subsection">
          {addComma(settlement.totalPrice)}원
        </div>
      </HStack>
      <HStack className="gap-11">
        <div className=" body_default text-grey-500">
          {Date.format(settlement.date)}
        </div>
        <div className=" body_default text-grey-500">
          {SETTLEMENT_STATUS_MAP[settlement.status]}
        </div>
      </HStack>
    </VStack>
  )
}
