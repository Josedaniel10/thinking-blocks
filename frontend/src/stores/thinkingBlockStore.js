import { create } from "zustand"
import {
  createThinkingBlock,
  deleteThinkingBlock,
  duplicateThinkingBlock,
  getThinkingBlock,
  getThinkingBlocksBySpaceBlock,
  updateThinkingBlock,
  openThinkingBlock,
} from "../api/thinkingBlocks"

import { executeAction } from "./helpers/createCrudStore"

export const useThinkingBlockStore = create((set, get) => ({
  thinkingBlock: null,

  thinkingBlocks: [],

  loading: false,

  error: null,

  clearError: () => {
    set({ error: null })
  },

  clearThinkingBlock: () => {
    set({ thinkingBlock: null })
  },

  fetchThinkingBlock: async (id) => {
    executeAction({
      set,
      action: () => getThinkingBlock(id),
      onSuccess: (thinkingBlock) =>
        set({
          thinkingBlock,
        }),
    })
  },

  fetchThinkingBlocks: async (spaceBlockId) => {
    return executeAction({
      set,
      action: () => getThinkingBlocksBySpaceBlock(spaceBlockId),
      onSuccess: (thinkingBlocks) =>
        set({
          thinkingBlocks,
        }),
    })
  },

  createThinkingBlock: async (payload) => {
    return executeAction({
      set,
      action: () => createThinkingBlock(payload),
      onSuccess: (newThinkingBlock) =>
        set((state) => ({
          thinkingBlocks: [...state.thinkingBlocks, newThinkingBlock],
        })),
    })
  },

  updateThinkingBlock: async (id, payload) => {
    return executeAction({
      set,
      action: () => updateThinkingBlock(id, payload),
      onSuccess: (updatedThinkingBlock) =>
        set((state) => ({
          thinkingBlocks: state.thinkingBlocks.map((block) =>
            block._id === id ? updatedThinkingBlock : block,
          ),

          thinkingBlock:
            state.thinkingBlock?._id === id
              ? updatedThinkingBlock
              : state.thinkingBlock,
        })),
    })
  },

  deleteThinkingBlock: async (id) => {
    return executeAction({
      set,
      action: () => deleteThinkingBlock(id),
      onSuccess: () =>
        set((state) => ({
          thinkingBlocks: state.thinkingBlocks.filter(
            (block) => block._id !== id,
          ),

          thinkingBlock:
            state.thinkingBlock?._id === id ? null : state.thinkingBlock,
        })),
    })
  },

  duplicateThinkingBlock: async (id) => {
    return executeAction({
      set,
      action: () => duplicateThinkingBlock(id),
      onSuccess: (duplicatedBlock) =>
        set((state) => ({
          thinkingBlocks: [...state.thinkingBlocks, duplicatedBlock],
        })),
    })
  },

  openThinkingBlock: async (id) => {
    return executeAction({
      set,
      action: () => openThinkingBlock(id),
    })
  },
}))
