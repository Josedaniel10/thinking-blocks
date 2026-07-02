import { create } from "zustand"

export const useCanvasStore = create((set) => ({
  // Viewport

  offsetX: 0,

  offsetY: 0,

  zoom: 1,

  // Selection

  selectedElementId: null,

  // Interaction

  isPanning: false,

  isDraggingElement: false,

  // Actions

  setZoom: (zoom) =>
    set({
      zoom,
    }),

  setOffset: (x, y) =>
    set({
      offsetX: x,
      offsetY: y,
    }),

  moveViewport: (dx, dy) =>
    set((state) => ({
      offsetX: state.offsetX + dx,
      offsetY: state.offsetY + dy,
    })),

  setSelectedElement: (id) =>
    set({
      selectedElementId: id,
    }),

  startPanning: () =>
    set({
      isPanning: true,
    }),

  stopPanning: () =>
    set({
      isPanning: false,
    }),

  startDraggingElement: () =>
    set({
      isDraggingElement: true,
    }),

  stopDraggingElement: () =>
    set({
      isDraggingElement: false,
    }),
}))