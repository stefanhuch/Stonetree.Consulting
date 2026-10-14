import { useRef } from "react"
import type { MouseEvent, PointerEvent } from "react"

// Wischgeste für Touch und Stift. Ausgelöst wird nur eine überwiegend
// waagerechte Bewegung ab einer Mindeststrecke, damit senkrechtes Scrollen
// der Seite nicht als Wischen zählt. Mausbewegungen bleiben unbeachtet,
// am Desktop gibt es die Pfeile.
// Das Element braucht touch-action: pan-y, sonst übernimmt der Browser auch
// die waagerechte Geste.

const MINDESTSTRECKE = 40

interface SwipeOptions {
  onLeft: () => void
  onRight: () => void
}

export function useSwipe({ onLeft, onRight }: SwipeOptions) {
  const start = useRef<{ x: number; y: number } | null>(null)
  // Nach einem Wischen keinen Klick auf die Karte darunter auslösen
  const gewischt = useRef(false)

  function onPointerDown(event: PointerEvent) {
    if (event.pointerType === "mouse") return
    gewischt.current = false
    start.current = { x: event.clientX, y: event.clientY }
  }

  function onPointerUp(event: PointerEvent) {
    const anfang = start.current
    start.current = null
    if (!anfang) return
    const dx = event.clientX - anfang.x
    const dy = event.clientY - anfang.y
    if (Math.abs(dx) < MINDESTSTRECKE || Math.abs(dx) < Math.abs(dy)) return
    gewischt.current = true
    if (dx < 0) onLeft()
    else onRight()
  }

  function onPointerCancel() {
    start.current = null
  }

  function onClickCapture(event: MouseEvent) {
    if (!gewischt.current) return
    gewischt.current = false
    event.preventDefault()
    event.stopPropagation()
  }

  return { onPointerDown, onPointerUp, onPointerCancel, onClickCapture }
}
