import { useSuspenseQuery } from '@suspensive/react-query'
import { useQuery } from '@tanstack/react-query'

import { axiosInstance } from '@/axios/axiosInstance'
import {
  ExtractQueryFunction,
  UseAxiosQueryOptions,
} from '@/utils/reactQueryTypeHelper'
import { settlementQueryKey } from '@/consts/reactQueryKeys'

import { SettlementStageType } from '../../../../types/settlementType'

export type SettlementDetailResponseType = {
  code: number
  status: string
  message: string
  data: {
    bankCode: string
    accountName: string
    accountNumber: string
    message: string
    totalPrice: number
    userId: number
    settlementStages: SettlementStageType[]
  }
}

type QueryOptions = UseAxiosQueryOptions<
  SettlementDetailResponseType,
  [string, { settlementID: number }]
>

const queryFn: ExtractQueryFunction<QueryOptions> = async ({ queryKey }) => {
  const [key, { settlementID }] = queryKey
  // return axiosInstance
  //   .get<SettlementDetailResponseType>(`/settlements/${settlementID}`)
  //   .then(v => v.data)

  return mockData
}

/**
 * 정산 상세 조회하는 API
 * @see http://158.180.90.28:8080/swagger-ui/index.html#/settlement-controller/findSettlements
 */
export function useGetSettlementDetail(
  settlementID: number,
  option?: QueryOptions
) {
  return useQuery([settlementQueryKey, { settlementID }], queryFn, {
    ...option,
  })
}

/**
 * 정산 상세 조회하는 suspense API
 * @see http://158.180.90.28:8080/swagger-ui/index.html#/settlement-controller/findSettlements
 */
export function useSuspenseGetSettlementDetail(
  settlementID: number,
  option?: QueryOptions
) {
  return useSuspenseQuery([settlementQueryKey, { settlementID }], queryFn, {
    ...option,
  })
}
//settlement에 식별값이 없네
const mockData: SettlementDetailResponseType = {
  code: 0,
  status: '100 CONTINUE',
  message: 'string',
  data: {
    bankCode: '032',
    accountName: '홍길동',
    accountNumber: '123456789',
    message: '정산 요청합니다.',
    totalPrice: 10000,
    userId: 1,
    settlementStages: [
      {
        id: 1,
        level: 1,
        totalPrice: 1000,
        participants: [
          {
            id: 1,
            name: '홍길동',
            price: 10000,
            priority: 1,
            settlementType: 'DUTCH_PAY',
          },
        ],
      },
      {
        id: 1,
        level: 2,
        totalPrice: 1000,
        participants: [
          {
            id: 1,
            name: '홍길동',
            price: 10000,
            priority: 1,
            settlementType: 'DUTCH_PAY',
          },
        ],
      },
    ],
  },
}
