import api from "./axios"

export const getThinkingBlock = async (id) => {
  const response = await api.get(`/thinking-blocks/${id}`)
  return response.data.data
}

export const getThinkingBlocksBySpaceBlock = async (
  spaceBlockId
) => {
  const response = await api.get(
    `/space-blocks/${spaceBlockId}/thinking-blocks`
  )

  return response.data.data
}

export const createThinkingBlock = async (payload) => {
  const response = await api.post(
    "/thinking-blocks",
    payload
  )

  return response.data.data
}

export const updateThinkingBlock = async (
  id,
  payload
) => {
  const response = await api.patch(
    `/thinking-blocks/${id}`,
    payload
  )

  return response.data.data
}

export const deleteThinkingBlock = async (id) => {
  const response = await api.delete(
    `/thinking-blocks/${id}`
  )

  return response.data.data
}

export const duplicateThinkingBlock = async (
  id
) => {
  const response = await api.post(
    `/thinking-blocks/${id}/duplicate`
  )

  return response.data.data
}