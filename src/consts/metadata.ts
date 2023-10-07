export const SETTLEMENT_STATUS_CODE_LIST = ['WAITING', 'DONE'] as const
export type SettlementStatusCodeType =
  (typeof SETTLEMENT_STATUS_CODE_LIST)[number]
export const SETTLEMENT_STATUS_MAP = {
  WAITING: '정산 진행중',
  DONE: '정산 완료',
}
