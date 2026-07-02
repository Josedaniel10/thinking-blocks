export default function CanvasViewport({
  offsetX,
  offsetY,
  zoom,
  children,
}) {
  return (
    <div
      className="absolute left-0 top-0"
      style={{
        transform: `
          translate(${offsetX}px, ${offsetY}px)
          scale(${zoom})
        `,
        transformOrigin: "0 0",
      }}
    >
      {children}
    </div>
  )
}