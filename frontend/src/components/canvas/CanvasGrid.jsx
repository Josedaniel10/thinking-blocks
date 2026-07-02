export default function CanvasGrid({
  offsetX,
  offsetY,
  zoom,
}) {
  const gridSize = 50

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(255,255,255,0.06) 1px,
            transparent 1px
          ),
          linear-gradient(
            90deg,
            rgba(255,255,255,0.06) 1px,
            transparent 1px
          )
        `,

        backgroundSize: `
          ${gridSize * zoom}px
          ${gridSize * zoom}px
        `,

        backgroundPosition: `
          ${offsetX}px
          ${offsetY}px
        `,
      }}
    />
  )
}