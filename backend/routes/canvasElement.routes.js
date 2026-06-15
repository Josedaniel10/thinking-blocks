import express from "express"
import {
  createCanvasElement,
  getCanvasElementById,
  archiveCanvasElement,
  updateCanvasElement,
} from "../controllers/canvasElement.controller.js"
const canvasElementRouter = express.Router()
import validateRequest from "../middlewares/validateRequest.js"
import {
  createCanvasElementSchema,
  updateCanvasElementSchema,
} from "../validators/canvasElement.validator.js"

canvasElementRouter.post(
  "/",
  validateRequest(createCanvasElementSchema),
  createCanvasElement,
)
canvasElementRouter.get("/:id/", getCanvasElementById)
canvasElementRouter.patch(
  "/:id",
  validateRequest(updateCanvasElementSchema),
  updateCanvasElement,
)
canvasElementRouter.delete("/:id", archiveCanvasElement)

export default canvasElementRouter
