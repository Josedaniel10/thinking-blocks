const errorHandler = (err, req, res, next) => {
  console.log(err)
  const statusCode = err.statusCode || 500
  let errorResponse = {
    status: statusCode,
    message: err.message || "Internal Server Error",
    type: "error",
  }

  res.status(errorResponse.status).json(errorResponse)
}

export default errorHandler
