import swaggerJsdoc from "swagger-jsdoc"

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Thinking Block API",
      version: "1.0.0",
      description:
        "API para gestionar SpaceBlocks, ThinkingBlocks y CanvasElements",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
  },

  apis: ["./routes/*.js", "./app.js"],
})

export default swaggerSpec
