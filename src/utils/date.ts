import dayjs from 'dayjs'

export namespace Date {
  /**
   *
   * @param date 날짜
   * @returns YYYY-MM-DD 형식으로 Format
   */
  export function format(date: string) {
    return dayjs(date).format('YYYY-MM-DD')
  }
}
