import SpaceBlock from "../models/SpaceBlock.js"
import ThinkingBlock from "../models/ThinkingBlock.js"

export const getHomeData = async (req, res) => {
  const [spaceBlocks, thinkingBlocks] = await Promise.all([
    SpaceBlock.find({
      isArchived: false,
      parentSpaceBlockId: null,
    }).lean(),

    ThinkingBlock.find({
      isArchived: false,
      spaceBlockId: null,
    }).lean(),
  ])

  const items = [
    ...spaceBlocks.map((spaceBlock) => ({
      ...spaceBlock,
      entityType: "space_block",
    })),

    ...thinkingBlocks.map((thinkingBlock) => ({
      ...thinkingBlock,
      entityType: "thinking_block",
    })),
  ]

  items.sort(
    (a, b) =>
      new Date(b.updatedAt) -
      new Date(a.updatedAt)
  )

  res.status(200).json({
    success: true,
    data: {
      items,
    },
  })
}
