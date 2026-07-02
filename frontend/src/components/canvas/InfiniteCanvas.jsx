import { useEffect, useRef } from "react"

import { useCanvasStore } from "../../stores/canvasStore"

import CanvasGrid from "./CanvasGrid"
import CanvasViewport from "./CanvasViewport"

export default function InfiniteCanvas({
  children,
}) {
  const {
    offsetX,
    offsetY,
    zoom,

    moveViewport,
    setZoom,

    isPanning,
    startPanning,
    stopPanning,
  } = useCanvasStore()

  const lastMousePosition = useRef({
    x: 0,
    y: 0,
  })

  const handleWheel = (event) => {
    event.preventDefault()

    const delta =
      event.deltaY > 0
        ? -0.1
        : 0.1

    const nextZoom = Math.max(
      0.2,
      Math.min(4, zoom + delta)
    )

    setZoom(nextZoom)
  }

  const handleMouseDown = (event) => {
    if (event.button !== 1) return

    startPanning()

    lastMousePosition.current = {
      x: event.clientX,
      y: event.clientY,
    }
  }

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!isPanning) return

      const dx =
        event.clientX -
        lastMousePosition.current.x

      const dy =
        event.clientY -
        lastMousePosition.current.y

      moveViewport(dx, dy)

      lastMousePosition.current = {
        x: event.clientX,
        y: event.clientY,
      }
    }

    const handleMouseUp = () => {
      stopPanning()
    }

    window.addEventListener(
      "mousemove",
      handleMouseMove
    )

    window.addEventListener(
      "mouseup",
      handleMouseUp
    )

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      )

      window.removeEventListener(
        "mouseup",
        handleMouseUp
      )
    }
  }, [
    isPanning,
    moveViewport,
    stopPanning,
  ])

  return (
    <div
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      className="
        relative
        h-screen
        w-screen
        overflow-hidden
        bg-zinc-950
      "
    >
      <CanvasGrid
        offsetX={offsetX}
        offsetY={offsetY}
        zoom={zoom}
      />

      <CanvasViewport
        offsetX={offsetX}
        offsetY={offsetY}
        zoom={zoom}
      >
        {children}
      </CanvasViewport>
    </div>
  )
}