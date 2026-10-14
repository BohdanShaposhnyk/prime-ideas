import { useCallback, useEffect, useRef, useState } from 'react'
import { VENUES } from '../../lib/venues'
import { DEFAULT_INDEX } from './config'

export function useVenueMap(openMs: number) {
  const slotNodeRef = useRef<HTMLDivElement | null>(null)
  const opening = useRef(false)

  const initial = VENUES[DEFAULT_INDEX]
  const [center, setCenter] = useState<[number, number]>([initial.lat, initial.lng])
  const [slotNode, setSlotNode] = useState<HTMLDivElement | null>(null)
  const [parkNode, setParkNode] = useState<HTMLDivElement | null>(null)
  const [lockedWidth, setLockedWidth] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [generation, setGeneration] = useState(0)

  const setPark = useCallback((node: HTMLDivElement | null) => {
    setParkNode(node)
  }, [])

  const setSlot = useCallback((node: HTMLDivElement | null) => {
    if (!node) {
      setSlotNode(null)
      return
    }
    const prev = slotNodeRef.current
    slotNodeRef.current = node
    setSlotNode(node)
    if (!prev || prev.dataset.venue === node.dataset.venue) return

    const venue = VENUES.find((item) => item.id === node.dataset.venue)
    if (venue) setCenter([venue.lat, venue.lng])
    if (openMs > 0) {
      opening.current = true
      setRevealed(false)
    }
    setGeneration((n) => n + 1)
  }, [openMs])

  useEffect(() => {
    const node = slotNode
    if (!node) return
    const publish = () => {
      if (opening.current) return
      const w = Math.round(node.clientWidth)
      if (w <= 0) return
      setLockedWidth((prev) => (prev === w ? prev : w))
      setRevealed(true)
    }
    publish()
    const ro = new ResizeObserver(publish)
    ro.observe(node)
    return () => ro.disconnect()
  }, [slotNode])

  useEffect(() => {
    if (generation === 0) return
    const id = window.setTimeout(() => {
      opening.current = false
      const w = Math.round(slotNodeRef.current?.clientWidth ?? 0)
      if (w > 0) setLockedWidth((prev) => (prev === w ? prev : w))
      setRevealed(true)
    }, openMs)
    return () => window.clearTimeout(id)
  }, [generation, openMs])

  return {
    center,
    lockedWidth,
    revealed,
    setPark,
    setSlot,
    target: slotNode ?? parkNode,
  }
}
