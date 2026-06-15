import express from "express"
import {
  createThinkingBlock,
  getThinkingBlockById,
  updateThinkingBlock,
  archiveThinkingBlock,
  duplicateThinkingBlock,
} from "../controllers/thinkingBlock.controller.js"
import validateRequest from "../middlewares/validateRequest.js"
import {
  createThinkingBlockSchema,
  updateThinkingBlockSchema,
} from "../validators/thinkingBlock.validator.js"

const thinkingBlockRouter = express.Router()

thinkingBlockRouter.post(
  "/",
  validateRequest(createThinkingBlockSchema),
  createThinkingBlock,
)
thinkingBlockRouter.get("/:id", 
  getThinkingBlockById
)
thinkingBlockRouter.patch(
  "/:id",
  validateRequest(updateThinkingBlockSchema),
  updateThinkingBlock,
)
thinkingBlockRouter.delete("/:id", archiveThinkingBlock)
thinkingBlockRouter.post("/:id/duplicate", duplicateThinkingBlock)

export default thinkingBlockRouter
