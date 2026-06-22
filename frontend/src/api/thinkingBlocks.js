import {
  apiGet,
  apiPost,
  apiPatch,
  apiDelete,
} from "./baseApi"

export const getThinkingBlock = (id) =>
  apiGet(`/thinking-blocks/${id}`)

export const createThinkingBlock = (payload) =>
  apiPost("/thinking-blocks", payload)

export const updateThinkingBlock = (id, payload) =>
  apiPatch(`/thinking-blocks/${id}`, payload)

export const deleteThinkingBlock = (id) =>
  apiDelete(`/thinking-blocks/${id}`)

export const duplicateThinkingBlock = (id) =>
  apiPost(`/thinking-blocks/${id}/duplicate`)

export const openThinkingBlock = (id) =>
  apiPatch(`/thinking-blocks/${id}/open`)

export const getThinkingBlocksBySpaceBlock = (id) =>
  apiGet(`/space-blocks/${id}/thinking-blocks`)