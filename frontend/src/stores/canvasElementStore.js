import { create } from "zustand"
import {
  getCanvasElement,
  getCanvasElementsByThinkingBlock,
  createCanvasElement,
  updateCanvasElement,
  archiveCanvasElement,
} from "../api/canvasElements"
import { executeAction } from "./helpers/createCrudStore"

export const useCanvasElementStore = create((set) => ({
  canvasElement: null,

  canvasElements: [],

  loading: false,

  error: null,

  clearError: () => set({ error: null }),

  clearCanvasElement: () => set({ canvasElement: null }),

  fetchCanvasElement: async (id) => {
    return executeAction({
      set,
      action: () => getCanvasElement(id),
      onSuccess: (canvasElement) =>
        set({
          canvasElement,
        }),
    })
  },

  fetchCanvasElementsByThinkingBlock: async (thinkingBlockId) => {
    return executeAction({
      set,
      action: () => getCanvasElementsByThinkingBlock(thinkingBlockId),
      onSuccess: (canvasElements) =>
        set({
          canvasElements,
        }),
    })
  },

  createCanvasElement: async (payload) => {
    return executeAction({
      set,
      action: () => createCanvasElement(payload),
      onSuccess: (newCanvasElement) =>
        set((state) => ({
          canvasElements: [...state.canvasElements, newCanvasElement],
        })),
    })
  },

  updateCanvasElement: async (id, payload) => {
    return executeAction({
      set,
      action: () => updateCanvasElement(id, payload),
      onSuccess: (updatedCanvasElement) =>
        set((state) => ({
          canvasElements: state.canvasElements.map((element) =>
            element._id === id ? updatedCanvasElement : element,
          ),

          canvasElement:
            state.canvasElement?._id === id
              ? updatedCanvasElement
              : state.canvasElement,
        })),
    })
  },

  archiveCanvasElement: async (id) => {
    return executeAction({
      set,
      action: () => archiveCanvasElement(id),
      onSuccess: () =>
        set((state) => ({
          canvasElements: state.canvasElements.filter(
            (element) => element._id !== id,
          ),

          canvasElement:
            state.canvasElement?._id === id ? null : state.canvasElement,
        })),
    })
  },
}))
