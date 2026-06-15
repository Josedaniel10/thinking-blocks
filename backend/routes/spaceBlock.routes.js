import express from "express"
import {
  createSpaceBlock,
  getSpaceBlocks,
  getSpaceBlockById,
  updateSpaceBlock,
  archiveSpaceBlock,
} from "../controllers/spaceBlock.controller.js"
import validateRequest from "../middlewares/validateRequest.js"
import {
  createSpaceBlockSchema,
  updateSpaceBlockSchema,
} from "../validators/spaceBlock.validator.js"

const spaceBlockRouter = express.Router()

spaceBlockRouter.post(
  "/",
  validateRequest(createSpaceBlockSchema),
  createSpaceBlock,
)
spaceBlockRouter.get("/", getSpaceBlocks)
spaceBlockRouter.get("/:id", getSpaceBlockById)
spaceBlockRouter.patch(
  "/:id",
  validateRequest(updateSpaceBlockSchema),
  updateSpaceBlock,
)
spaceBlockRouter.delete("/:id", archiveSpaceBlock)

export default spaceBlockRouter
