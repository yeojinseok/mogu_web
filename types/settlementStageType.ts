export type SettlementStageType = {
  level: number
  totalPrice: number
  friends: SettlementFriendsType[]
}

type SettlementFriendsType = {
  name: string
  settlementType: string
  price: number
}
