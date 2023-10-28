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
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useRecoilValue } from 'recoil'

export default function SettlementListComponent() {
  const filterValue = useRecoilValue(settlementFilterValue)

  const request: SettlementListRequestType = {
    endDate: filterValue.endDate.format('YYYY-MM-DDTHH:mm:ssZ'),
    startDate: filterValue.startDate.format('YYYY-MM-DDTHH:mm:ssZ'),
    page: 1,
    limit: 10,
  }
  const { data } = useSuspenseGetSettlementList(request)
  console.log(data)
  return (
    <VStack className="h-full overflow-y-scroll ">
      {data.data.settlements.map(settlement => (
        <ListItem key={settlement.id} settlement={settlement} />
      ))}
      {data.data.settlements.map(settlement => (
        <ListItem key={settlement.id} settlement={settlement} />
      ))}
      {data.data.settlements.map(settlement => (
        <ListItem key={settlement.id} settlement={settlement} />
      ))}
      {data.data.settlements.map(settlement => (
        <ListItem key={settlement.id} settlement={settlement} />
      ))}
    </VStack>
  )
}

function ListItem({ settlement }: { settlement: SettlementResponseType }) {
  const route = useRouter()

  console.log(dayjs(settlement.date).toISOString())
  console.log(dayjs(settlement.date))
  console.log(settlement.date)
  return (
    <VStack
      onClick={() => route.push(`/settlement/${settlement.id}`)}
      className="gap-4 px-16 py-20 border-b-1 border-b-grey-50"
    >
      <HStack className="justify-between ">
        <div className=" title_subsection">title</div>
        <div className=" title_subsection">
          {addComma(settlement.totalPrice)}원
        </div>
      </HStack>
      <HStack className="gap-11">
        <div className=" body_default text-grey-500">
          {Date.format(dayjs(settlement.date).toISOString())}
        </div>
        <div className=" body_default text-grey-500">
          {SETTLEMENT_STATUS_MAP[settlement.status]}
        </div>
      </HStack>
    </VStack>
  )
}
