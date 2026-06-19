import SpaceBlock from "../models/SpaceBlock.js"
import ThinkingBlock from "../models/ThinkingBlock.js"

export const validateSpaceBlockExists = async (spaceBlockId) => {
  try {
    const spaceBlock = await SpaceBlock.findOne({
      _id: spaceBlockId,
      isArchived: false,
    })
    return !!spaceBlock
  } catch (error) {
    return false
  }
}

export const validateThinkingBlockExists = async (thinkingBlockId) => {
  try {
    const thinkingBlock = await ThinkingBlock.findOne({
      _id: thinkingBlockId,
      isArchived: false,
    })
    return !!thinkingBlock
  } catch (error) {
    return false
  }
}
