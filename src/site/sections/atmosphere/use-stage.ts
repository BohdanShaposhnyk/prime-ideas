import { useLayoutEffect, useState, type RefObject } from 'react'

export function useStageSize(stageRef: RefObject<HTMLElement | null>) {
  const [stage, setStage] = useState({ w: 0, h: 0 })

  useLayoutEffect(() => {
    const el = stageRef.current
    if (!el) return
    const update = () => setStage({ w: el.clientWidth, h: el.clientHeight })
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [stageRef])

  return stage
}
