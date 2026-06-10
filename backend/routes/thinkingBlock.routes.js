import express from "express"
import {
  createThinkingBlock,
  getThinkingBlockById,
  updateThinkingBlock,
  archiveThinkingBlock,
  duplicateThinkingBlock,
} from "../controllers/thinkingBlock.controller"
const thinkingBlockRouter = express.Router()

thinkingBlockRouter.post("/",
    createThinkingBlock
)
thinkingBlockRouter.get("/:id/",
    getThinkingBlockById
)
thinkingBlockRouter.patch("/:id",
    updateThinkingBlock
)
thinkingBlockRouter.delete("/:id",
    archiveThinkingBlock
)
thinkingBlockRouter.post("/:id/duplicate",
    duplicateThinkingBlock
)

export default thinkingBlockRouter
