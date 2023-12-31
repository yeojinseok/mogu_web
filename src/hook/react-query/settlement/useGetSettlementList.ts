import { useSuspenseQuery } from '@suspensive/react-query'
import { useQuery } from '@tanstack/react-query'

import { axiosInstance } from '@/axios/axiosInstance'
import {
  ExtractQueryFunction,
  UseAxiosQueryOptions,
} from '@/utils/reactQueryTypeHelper'
import { settlementQueryKey } from '@/consts/reactQueryKeys'

import useUserID from '@/hook/useUser'
import { SettlementStatusCodeType } from '@/consts/metadata'

export type SettlementResponseType = {
  id: number
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
  [string, { userID: number } & SettlementListRequestType]
>

const queryFn: ExtractQueryFunction<QueryOptions> = async ({ queryKey }) => {
  const [key, { userID, ...request }] = queryKey
  return axiosInstance
    .get<SettlementListResponseType>(`/settlements/users/${userID}`, {
      params: request,
    })
    .then(v => v.data)
}
/**
 * 정산 리스트를 조회하는 API
 * @see http://158.180.90.28:8080/swagger-ui/index.html#/settlement-controller/findSettlements
 */
export function useGetSettlementList(
  request: SettlementListRequestType,
  option?: QueryOptions
) {
  const userId = useUserID()
  return useQuery(
    [settlementQueryKey, { userID: userId, ...request }],
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
  const userId = useUserID()
  return useSuspenseQuery(
    [settlementQueryKey, { userID: userId, ...request }],
    queryFn,
    {
      ...option,
    }
  )
}
