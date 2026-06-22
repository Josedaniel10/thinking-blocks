import { create } from "zustand"

import {
  getSpaceBlocks,
  getSpaceBlock,
  createSpaceBlock,
  updateSpaceBlock,
  deleteSpaceBlock,
  openSpaceBlock,
} from "../api/spaceBlocks"
import { executeAction } from "./helpers/createCrudStore"

export const useSpaceBlockStore = create((set) => ({
  spaceBlocks: [],

  currentSpaceBlock: null,

  loading: false,

  error: null,

  clearError: () => set({ error: null }),

  clearCurrentSpaceBlock: () => set({ currentSpaceBlock: null }),

  fetchSpaceBlocks: async () => {
    return executeAction({
      set,
      action: () => getSpaceBlocks(),
      onSuccess: (spaceBlocks) =>
        set({
          spaceBlocks,
        }),
    })
  },

  fetchSpaceBlock: async (id) => {
    return executeAction({
      set,
      action: () => getSpaceBlock(id),
      onSuccess: (spaceBlock) =>
        set({
          currentSpaceBlock: spaceBlock,
        }),
    })
  },

  createSpaceBlock: async (payload) =>
    executeAction({
      set,

      action: () => createSpaceBlock(payload),

      onSuccess: (spaceBlock) =>
        set((state) => ({
          spaceBlocks: [...state.spaceBlocks, spaceBlock],
        })),
    }),

  updateSpaceBlock: async (id, payload) =>
    executeAction({
      set,

      action: () => updateSpaceBlock(id, payload),

      onSuccess: (updated) =>
        set((state) => ({
          spaceBlocks: state.spaceBlocks.map((spaceBlock) =>
            spaceBlock._id === id ? updated : spaceBlock,
          ),

          currentSpaceBlock:
            state.currentSpaceBlock?._id === id
              ? updated
              : state.currentSpaceBlock,
        })),
    }),

  deleteSpaceBlock: async (id) => {
    return executeAction({
      set,
      action: () => deleteSpaceBlock(id),
      onSuccess: () =>
        set((state) => ({
          spaceBlocks: state.spaceBlocks.filter(
            (spaceBlock) => spaceBlock._id !== id,
          ),

          currentSpaceBlock:
            state.currentSpaceBlock?._id === id
              ? null
              : state.currentSpaceBlock,
        })),
    })
  },

  openSpaceBlock: async (id) => {
    return executeAction({
      set,
      action: () => openSpaceBlock(id),
    })
  },
}))
