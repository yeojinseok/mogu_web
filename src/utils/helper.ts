/**
 *
 * @param price 포멧팅할 가격
 * @returns , 가 추가된 가격
 */
export const addComma = (price: number) => {
  let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return returnString
}
