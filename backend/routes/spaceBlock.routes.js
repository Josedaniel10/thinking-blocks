import express from "express"
import {
  createSpaceBlock,
  getSpaceBlocks,
  getSpaceBlockById,
  updateSpaceBlock,
  archiveSpaceBlock,
} from "../controllers/spaceBlock.controller"
const spaceBlockRouter = express.Router()

spaceBlockRouter.post("/",
    createSpaceBlock
)
spaceBlockRouter.get("/",
    getSpaceBlocks
)
spaceBlockRouter.get("/:id",
    getSpaceBlockById
)
spaceBlockRouter.get("/:id/thinking-blocks")
spaceBlockRouter.patch("/:id",
    updateSpaceBlock
)
spaceBlockRouter.delete("/:id",
    archiveSpaceBlock
)

export default spaceBlockRouter
