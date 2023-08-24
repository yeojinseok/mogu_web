export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="w-full h-full overflow-hidden">{children}</div>
}
