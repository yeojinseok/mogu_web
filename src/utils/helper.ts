import { BANK_CODE_LIST } from '@/consts/bankCodeList'

/**
 *
 * @param price 포멧팅할 가격
 * @return , 가 추가된 가격
 */
export const addComma = (price: number) => {
  let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return returnString
}

/**
 *
 * @param code 은행 코드
 * @return 은행코드와 일치하는 은행의 이름
 */
export function getBackTitleFromCode(code: string) {
  const title = BANK_CODE_LIST.find(v => v.code === code)?.title
  return title ?? ''
}
