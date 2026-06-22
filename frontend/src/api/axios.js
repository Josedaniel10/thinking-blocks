import axios from "axios"

const api = axios.create({
  url: "http://localhost:3000/api",
})

api.interceptors.response.use(
  (response) => response,

  (error) => {
    const message =
      error.response?.data?.message ||
      "Unexpected server error"

    return Promise.reject(
      new Error(message)
    )
  }
)

export default api
