export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full min-h-screen overflow-hidden max-w-screen-tablet bg-grey-50">
      {children}
    </div>
  )
}
