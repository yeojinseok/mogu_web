import type {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
} from '@tanstack/react-query'
import type { AxiosError } from 'axios'

/**
 * QueryFnData의 TData와 queryFunction의 return 타입을 동일하게 맵핑해놓은 타입
 */
export type UseSimpleQueryOptions<
  TData = unknown,
  TError = unknown,
  TQueryKey extends QueryKey = QueryKey
> = UseQueryOptions<TData, TError, TData, TQueryKey>

/**
 * 에러가 AxiosError 인 UseSimpleQueryOptions 타입.
 */
export type UseAxiosQueryOptions<
  TData = unknown,
  TQueryKey extends QueryKey = QueryKey
> = UseSimpleQueryOptions<TData, AxiosError, TQueryKey>

/**
 * React Query 에서 옵션으로부터 QueryFn 타입을 추출합니다.
 */
export type ExtractQueryFunction<Options> =
  Options extends UseSimpleQueryOptions<
    infer TData,
    infer TError,
    infer TQueryKey
  >
    ? QueryFunction<TData, TQueryKey>
    : never

/**
 * React Query 에서 옵션으로부터 TData 타입을 추출합니다.
 */
export type ExtractQueryData<Options> = Options extends UseSimpleQueryOptions<
  infer TData,
  infer TError,
  infer TQueryKey
>
  ? TData
  : never
