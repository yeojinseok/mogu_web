export type SettlementStageType = {
  level: number
  totalPrice: number
  participants: SettlementFriendsType[]
}

export type SettlementFriendsType = {
  id: number
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

// export type SettlementType =
