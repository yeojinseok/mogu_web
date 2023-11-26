import Header from '@/components/common/Header'
import { VStack } from '@/components/common/Stack'
import EmailFormSection from './_component/EmailFormSection'

export default function EmailAuthPage() {
  return (
    <VStack className="w-full h-full">
      <Header title="이메일로 계속하기" />
      <EmailFormSection />
    </VStack>
  )
}
