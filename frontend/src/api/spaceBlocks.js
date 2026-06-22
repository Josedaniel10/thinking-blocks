import {
  apiGet,
  apiPost,
  apiPatch,
  apiDelete,
} from "./baseApi"

export const getSpaceBlocks = () =>
  apiGet("/space-blocks")

export const getSpaceBlock = (id) =>
  apiGet(`/space-blocks/${id}`)

export const createSpaceBlock = (payload) =>
  apiPost("/space-blocks", payload)

export const updateSpaceBlock = (id, payload) =>
  apiPatch(`/space-blocks/${id}`, payload)

export const deleteSpaceBlock = (id) =>
  apiDelete(`/space-blocks/${id}`)

export const openSpaceBlock = (id) =>
  apiPatch(`/space-blocks/${id}/open`)
