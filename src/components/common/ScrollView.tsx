import React from 'react'

/**
 * 반응형으로 100% 높이 scroll 영역 container
 * 부모와 자식영역에서도 높이가 반응형으로 구성되어야 유효함
 */
export default function ScrollContainer({
  children,
  overflow = 'auto',
}: {
  children: React.ReactElement
  overflow?: 'hidden' | 'auto'
}) {
  const containerRef = React.useRef<HTMLDivElement>(null)

  const [containerSize, setContainerSize] = React.useState<{
    width?: number
    height?: number
  }>({
    width: undefined,
    height: undefined,
  })

  React.useEffect(() => {
    if (!containerSize.width && containerRef.current) {
      setContainerSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      })
    }

    const observer = new ResizeObserver(entries => {
      setContainerSize({
        height: entries[0]?.contentRect.height,
        width: entries[0]?.contentRect.width,
      })
    })

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <div
        style={{
          width: containerSize.width,
          height: containerSize.height,
          overflow: overflow,
        }}
      >
        {(containerSize.height ?? 0) > 0 && children}
      </div>
    </div>
  )
}
