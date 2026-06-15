import express from "express"
import errorHandler from "./middlewares/errorHandler.js"
import spaceBlockRouter from "./routes/spaceBlock.routes.js"
import thinkingBlockRouter from "./routes/thinkingBlock.routes.js"
import canvasElementRouter from "./routes/canvasElement.routes.js"
import cors from "cors"
import { getThinkingBlocksBySpaceBlock } from "./controllers/thinkingBlock.controller.js"
import { getElementsByThinkingBlock } from "./controllers/canvasElement.controller.js"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/space-blocks", spaceBlockRouter)
app.use("/api/thinking-blocks", thinkingBlockRouter)
app.use("/api/canvas-element", canvasElementRouter)
app.get("/api/space-blocks/:id/thinking-blocks", getThinkingBlocksBySpaceBlock)
app.get("/api/thinking-blocks/:id/elements", getElementsByThinkingBlock)

app.use(errorHandler)

export default app
