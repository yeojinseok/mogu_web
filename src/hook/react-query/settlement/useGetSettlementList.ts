import { useSuspenseQuery } from '@suspensive/react-query'
import { useQuery } from '@tanstack/react-query'

import { axiosInstance } from '@/axios/axiosInstance'
import {
  ExtractQueryFunction,
  UseAxiosQueryOptions,
} from '@/utils/reactQueryTypeHelper'
import { settlementQueryKey } from '@/consts/reactQueryKeys'

import useUser from '@/hook/useUser'
import { SettlementStatusCodeType } from '@/consts/metadata'

export type SettlementResponseType = {
  totalPrice: number
  status: SettlementStatusCodeType
  date: string
}

export type SettlementListResponseType = {
  code: number
  status: string
  message: string
  data: {
    settlements: SettlementResponseType[]

    totalDataCount: number
    maxPage: number
    hasNext: boolean
  }
}

export type SettlementListRequestType = {
  page: number
  limit: number
  startDate: string
  endDate: string
}

type QueryOptions = UseAxiosQueryOptions<
  SettlementListResponseType,
  [string, { userID: string } & SettlementListRequestType]
>

const queryFn: ExtractQueryFunction<QueryOptions> = async ({ queryKey }) => {
  const [key, { userID, ...request }] = queryKey
  // return axiosInstance
  //   .get<SettlementListResponseType>(`/settlements/users/${userID}`, {
  //     params: request,
  //   })
  //   .then(v => v.data)

  return mockData
}

/**
 * 정산 리스트를 조회하는 API
 * @see http://158.180.90.28:8080/swagger-ui/index.html#/settlement-controller/findSettlements
 */
export function useGetSettlementList(
  request: SettlementListRequestType,
  option?: QueryOptions
) {
  const user = useUser()
  return useQuery(
    [settlementQueryKey, { userID: user.userID, ...request }],
    queryFn,
    {
      ...option,
    }
  )
}

/**
 * 정산 리스트를 조회하는 suspense API
 * @see http://158.180.90.28:8080/swagger-ui/index.html#/settlement-controller/findSettlements
 */
export function useSuspenseGetSettlementList(
  request: SettlementListRequestType,
  option?: QueryOptions
) {
  const user = useUser()
  return useSuspenseQuery(
    [settlementQueryKey, { userID: user.userID, ...request }],
    queryFn,
    {
      ...option,
    }
  )
}
//settlement에 식별값이 없네
const mockData: SettlementListResponseType = {
  code: 0,
  status: '100 CONTINUE',
  message: 'string',
  data: {
    settlements: [
      {
        totalPrice: 10000,
        status: 'WAITING',
        date: '2021-08-01T00:00:00Z',
      },
      {
        totalPrice: 10000,
        status: 'WAITING',
        date: '2021-08-01T00:00:00Z',
      },
      {
        totalPrice: 10000,
        status: 'WAITING',
        date: '2021-08-01T00:00:00Z',
      },
      {
        totalPrice: 10000,
        status: 'WAITING',
        date: '2021-08-01T00:00:00Z',
      },
      {
        totalPrice: 10000,
        status: 'WAITING',
        date: '2021-08-01T00:00:00Z',
      },
      {
        totalPrice: 10000,
        status: 'WAITING',
        date: '2021-08-01T00:00:00Z',
      },
      {
        totalPrice: 10000,
        status: 'WAITING',
        date: '2021-08-01T00:00:00Z',
      },
      {
        totalPrice: 10000,
        status: 'WAITING',
        date: '2021-08-01T00:00:00Z',
      },
      {
        totalPrice: 10000,
        status: 'WAITING',
        date: '2021-08-01T00:00:00Z',
      },
    ],
    totalDataCount: 10,
    maxPage: 2,
    hasNext: true,
  },
}
