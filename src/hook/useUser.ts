import { useAuthStore } from '@/feature/auth/store/authStore'
import { useShallow } from 'zustand/react/shallow'

/**
 * @returns userId null을 제거한 타입으로 Return
 */
export default function useUserID() {
  const { userId, signOut } = useAuthStore(
    useShallow(state => ({ userId: state.userId, signOut: state.signOut }))
  )

  if (!userId) {
    signOut()
    return -1
  }

  return userId
}
