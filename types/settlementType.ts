export type SettlementStageType = {
  level: number
  totalPrice: number
  friends: SettlementFriendsType[]
}

export type SettlementFriendsType = {
  id: string
  name: string
  settlementType?: string
  settlementPercent?: number
  price: number
}

export type SettlementInfoType = {
  bankCode: string
  accountName: string
  accountNumber: string
  message: string
}
