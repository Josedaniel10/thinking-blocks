import { create } from "zustand"
import {
  createThinkingBlock,
  deleteThinkingBlock,
  duplicateThinkingBlock,
  getThinkingBlock,
  getThinkingBlocksBySpaceBlock,
  updateThinkingBlock,
} from "../api/thinkingBlocks"

export const useThinkingBlockStore = create((set, get) => ({
  // State

  thinkingBlock: null,

  thinkingBlocks: [],

  loading: false,

  error: null,

  // Actions

  clearError: () => {
    set({ error: null })
  },

  clearThinkingBlock: () => {
    set({ thinkingBlock: null })
  },

  // GET ONE

  fetchThinkingBlock: async (id) => {
    try {
      set({
        loading: true,
        error: null,
      })

      const thinkingBlock = await getThinkingBlock(id)

      set({
        thinkingBlock,
      })

      return thinkingBlock
    } catch (error) {
      set({
        error: error.message,
      })

      throw error
    } finally {
      set({
        loading: false,
      })
    }
  },

  // GET BY SPACE BLOCK

  fetchThinkingBlocks: async (spaceBlockId) => {
    try {
      set({
        loading: true,
        error: null,
      })

      const thinkingBlocks =
        await getThinkingBlocksBySpaceBlock(spaceBlockId)

      set({
        thinkingBlocks,
      })

      return thinkingBlocks
    } catch (error) {
      set({
        error: error.message,
      })

      throw error
    } finally {
      set({
        loading: false,
      })
    }
  },

  // CREATE

  createThinkingBlock: async (payload) => {
    try {
      set({
        loading: true,
        error: null,
      })

      const newThinkingBlock =
        await createThinkingBlock(payload)

      set((state) => ({
        thinkingBlocks: [
          ...state.thinkingBlocks,
          newThinkingBlock,
        ],
      }))

      return newThinkingBlock
    } catch (error) {
      set({
        error: error.message,
      })

      throw error
    } finally {
      set({
        loading: false,
      })
    }
  },

  // UPDATE

  updateThinkingBlock: async (id, payload) => {
    try {
      set({
        loading: true,
        error: null,
      })

      const updatedThinkingBlock =
        await updateThinkingBlock(id, payload)

      set((state) => ({
        thinkingBlocks: state.thinkingBlocks.map((block) =>
          block._id === id
            ? updatedThinkingBlock
            : block
        ),

        thinkingBlock:
          state.thinkingBlock?._id === id
            ? updatedThinkingBlock
            : state.thinkingBlock,
      }))

      return updatedThinkingBlock
    } catch (error) {
      set({
        error: error.message,
      })

      throw error
    } finally {
      set({
        loading: false,
      })
    }
  },

  // DELETE (SOFT DELETE)

  deleteThinkingBlock: async (id) => {
    try {
      set({
        loading: true,
        error: null,
      })

      await deleteThinkingBlock(id)

      set((state) => ({
        thinkingBlocks: state.thinkingBlocks.filter(
          (block) => block._id !== id
        ),

        thinkingBlock:
          state.thinkingBlock?._id === id
            ? null
            : state.thinkingBlock,
      }))
    } catch (error) {
      set({
        error: error.message,
      })

      throw error
    } finally {
      set({
        loading: false,
      })
    }
  },

  // DUPLICATE

  duplicateThinkingBlock: async (id) => {
    try {
      set({
        loading: true,
        error: null,
      })

      const duplicatedBlock =
        await duplicateThinkingBlock(id)

      set((state) => ({
        thinkingBlocks: [
          ...state.thinkingBlocks,
          duplicatedBlock,
        ],
      }))

      return duplicatedBlock
    } catch (error) {
      set({
        error: error.message,
      })

      throw error
    } finally {
      set({
        loading: false,
      })
    }
  },
}))