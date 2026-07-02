import {
  apiGet,
  apiPost,
  apiPatch,
  apiDelete,
} from "./baseApi"

export const getCanvasElement = (id) =>
  apiGet(`/canvas-element/${id}`)

export const getCanvasElementsByThinkingBlock = (thinkingBlockId) =>
  apiGet(`/canvas-elements/thinking-block/${thinkingBlockId}`)

export const createCanvasElement = (payload) =>
  apiPost("/canvas-element", payload)

export const updateCanvasElement = (id, payload) =>
  apiPatch(`/canvas-element/${id}`, payload)

export const archiveCanvasElement = (id) =>
  apiDelete(`/canvas-element/${id}`)
