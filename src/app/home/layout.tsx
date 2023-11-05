import AuthGuard from '@/feature/auth/wrappers/AuthGuard'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>
}
