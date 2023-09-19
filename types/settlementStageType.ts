export type SettlementStageType = {
  level: number
  totalPrice: number
  friends: SettlementFriendsType[]
}

export type SettlementFriendsType = {
  id: string
  name: string
  settlementType: string
  price: number
}
