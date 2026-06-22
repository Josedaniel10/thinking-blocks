import api from "./axios"

export const apiGet = async (url) => {
  const { data } = await api.get(url)
  return data.data
}

export const apiPost = async (url, payload) => {
  const { data } = await api.post(url, payload)
  return data.data
}

export const apiPatch = async (url, payload = {}) => {
  const { data } = await api.patch(url, payload)
  return data.data
}

export const apiDelete = async (url) => {
  const { data } = await api.delete(url)
  return data.data
}