import { useSuspenseQuery } from '@suspensive/react-query'
import { useQuery } from '@tanstack/react-query'

import { axiosInstance } from '@/axios/axiosInstance'
import {
  ExtractQueryFunction,
  UseAxiosQueryOptions,
} from '@/utils/reactQueryTypeHelper'
import { settlementQueryKey, userQueryKey } from '@/consts/reactQueryKeys'

import { SettlementStageType } from '../../../../types/settlementType'

export type UserDetailResponseType = {
  code: number
  status: string
  message: string
  data: {
    nickname: string
  }
}

type QueryOptions = UseAxiosQueryOptions<
  UserDetailResponseType,
  [string, { userID: number }]
>

const queryFn: ExtractQueryFunction<QueryOptions> = async ({ queryKey }) => {
  const [key, { userID }] = queryKey
  return axiosInstance
    .get<UserDetailResponseType>(`/users/${userID}`)
    .then(v => v.data)
}

/**
 * 정산 상세 조회하는 API
 * @see http://158.180.90.28:8080/swagger-ui/index.html#/settlement-controller/findSettlements
 */
export function useGetUserDetail(userID: number, option?: QueryOptions) {
  return useQuery([userQueryKey, { userID }], queryFn, {
    ...option,
  })
}

/**
 * 정산 상세 조회하는 suspense API
 * @see http://158.180.90.28:8080/swagger-ui/index.html#/settlement-controller/findSettlements
 */
export function useSuspenseGetUserDetail(
  userID: number,
  option?: QueryOptions
) {
  return useSuspenseQuery([userQueryKey, { userID }], queryFn, {
    ...option,
  })
}
