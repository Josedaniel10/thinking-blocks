import express from "express"
import {
  createCanvasElement,
  getCanvasElementById,
  archiveCanvasElement,
  updateCanvasElement,
} from "../controllers/canvasElement.controller"
const canvasElementRouter = express.Router()

canvasElementRouter.post("/",
    createCanvasElement
)
canvasElementRouter.get("/:id/",
    getCanvasElementById
)
canvasElementRouter.patch("/:id",
    updateCanvasElement
)
canvasElementRouter.delete("/:id",
    archiveCanvasElement
)

export default canvasElementRouter
