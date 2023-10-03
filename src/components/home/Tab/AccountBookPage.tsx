'use client'
import { Chip } from '@/components/common/Chip'
import { HStack, VStack } from '@/components/common/Stack'
import { settlementFilterValue } from '@/recoil/settlementFilterValue'
import dayjs from 'dayjs'
import { useState } from 'react'
import Sheet, { SheetRef } from 'react-modal-sheet'
import { useRecoilState } from 'recoil'

export default function AccountBookPage() {
  const [isOpen, setIsOpen] = useState(false)

  const [filterValue, setFilterValue] = useRecoilState(settlementFilterValue)

  const startDate = filterValue.startDate.format('YYYY-MM-DD')
  const endDate = filterValue.endDate.format('YYYY-MM-DD')

  const openSheet = () => {
    setIsOpen(true)
  }

  const closeSheet = () => {
    setIsOpen(false)
  }

  return (
    <>
      <VStack className="px-16">
        <HStack className="justify-between py-20">
          <div className="body_large">
            {startDate}~{endDate}
          </div>
          <div onClick={openSheet} className="underline title_body">
            조회설정
          </div>
        </HStack>
      </VStack>
      <FilterBottomSheet isOpen={isOpen} closeSheet={closeSheet} />
    </>
  )
}

const DATE_FILTER_DATA = [
  {
    title: '1개월',
    value: dayjs().subtract(1, 'M'),
  },
  {
    title: '3개월',
    value: dayjs().subtract(3, 'M'),
  },
  {
    title: '6개월',
    value: dayjs().subtract(6, 'M'),
  },
  {
    title: '1년',
    value: dayjs().subtract(1, 'year'),
  },
]

function FilterBottomSheet({
  isOpen,
  closeSheet,
}: {
  isOpen: boolean
  closeSheet: () => void
}) {
  const [filterValue, setFilterValue] = useRecoilState(settlementFilterValue)

  return (
    <Sheet
      snapPoints={[0.6]}
      isOpen={isOpen}
      onClose={closeSheet}
      initialSnap={0}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <Sheet.Scroller>
            <VStack className="gap-32 px-20">
              <HStack className="gap-21">
                {DATE_FILTER_DATA.map(date => (
                  <Chip
                    onClick={() => {
                      setFilterValue(prev => ({
                        ...prev,
                        startDate: date.value,
                      }))
                    }}
                    active={
                      filterValue.startDate.format('YYYY-MM-DD') ===
                      date.value.format('YYYY-MM-DD')
                    }
                    key={date.title}
                    variants="primary"
                    title={date.title}
                    size="small"
                  />
                ))}
              </HStack>

              <VStack>
                <div>정산 타입</div>
              </VStack>
            </VStack>
          </Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={() => closeSheet()} />
    </Sheet>
  )
}
