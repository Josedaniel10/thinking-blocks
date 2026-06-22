import express from "express"
import errorHandler from "./middlewares/errorHandler.js"
import spaceBlockRouter from "./routes/spaceBlock.routes.js"
import thinkingBlockRouter from "./routes/thinkingBlock.routes.js"
import canvasElementRouter from "./routes/canvasElement.routes.js"
import homeRouter from "./routes/home.routes.js"
import cors from "cors"
import { getThinkingBlocksBySpaceBlock } from "./controllers/thinkingBlock.controller.js"
import { getElementsByThinkingBlock } from "./controllers/canvasElement.controller.js"
import swaggerUi from "swagger-ui-express"
import swaggerSpec from "./config/swagger.js"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/space-blocks", spaceBlockRouter)
app.use("/api/thinking-blocks", thinkingBlockRouter)
app.use("/api/canvas-element", canvasElementRouter)
app.use('/api/home', homeRouter)

/**
 * @swagger
 * /space-blocks/{id}/thinking-blocks:
 *   get:
 *     summary: Obtener ThinkingBlocks de un SpaceBlock
 *     description: Obtiene todos los ThinkingBlocks no archivados que pertenecen a un SpaceBlock específico
 *     tags:
 *       - SpaceBlocks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del SpaceBlock
 *     responses:
 *       200:
 *         description: Lista de ThinkingBlocks obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: number
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
app.get("/api/space-blocks/:id/thinking-blocks", getThinkingBlocksBySpaceBlock)

/**
 * @swagger
 * /thinking-blocks/{id}/elements:
 *   get:
 *     summary: Obtener CanvasElements de un ThinkingBlock
 *     description: Obtiene todos los CanvasElements no archivados que pertenecen a un ThinkingBlock específico
 *     tags:
 *       - ThinkingBlocks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del ThinkingBlock
 *     responses:
 *       200:
 *         description: Lista de CanvasElements obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: number
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
app.get("/api/thinking-blocks/:id/elements", getElementsByThinkingBlock)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(errorHandler)

export default app
