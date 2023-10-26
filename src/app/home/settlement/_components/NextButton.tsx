'use client'
import { Button } from '@/components/common/Button'
import useQueryParams from '@/hook/useQueryParams'

export default function NextButton() {
  const { queryParams, setQueryParams } = useQueryParams()

  return (
    <div className="p-16 footer">
      <Button onClick={() => setQueryParams({ step: 2 })}>다음</Button>
    </div>
  )
}
