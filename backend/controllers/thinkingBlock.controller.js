import ThinkingBlock from "../models/ThinkingBlock.js"
import SpaceBlock from "../models/SpaceBlock.js"
import CanvasElement from "../models/CanvasElement.js"
import asyncHandler from "../utils/asyncHandler.js"
import { validateSpaceBlockExists } from "../utils/validateExists.js"

export const createThinkingBlock = asyncHandler(async (req, res) => {
  const { title, description, icon, spaceBlockId, thumbnail, position } =
    req.body

  if (spaceBlockId && !(await validateSpaceBlockExists(spaceBlockId))) {
    return res.status(400).json({
      success: false,
      message: "The assigned SpaceBlock does not exist",
    })
  }

  const thinkingBlock = await ThinkingBlock.create({
    title,
    description,
    icon,
    spaceBlockId,
    thumbnail,
    position,
  })

  res.status(201).json({
    success: true,
    data: thinkingBlock,
  })
})

export const getThinkingBlockById = asyncHandler(async (req, res) => {
  const thinkingBlock = await ThinkingBlock.findOne({
    _id: req.params.id,
    isArchived: false,
  })

  if (!thinkingBlock) {
    return res.status(404).json({
      success: false,
      message: "ThinkingBlock not found",
    })
  }

  thinkingBlock.lastOpenedAt = Date.now()
  await thinkingBlock.save()

  res.status(200).json({
    success: true,
    data: thinkingBlock,
  })
})

export const updateThinkingBlock = asyncHandler(async (req, res) => {
  if (
    req.body.spaceBlockId &&
    !(await validateSpaceBlockExists(req.body.spaceBlockId))
  ) {
    return res.status(400).json({
      success: false,
      message: "The assigned SpaceBlock does not exist",
    })
  }

  const thinkingBlock = await ThinkingBlock.findOneAndUpdate(
    {
      _id: req.params.id,
      isArchived: false,
    },
    req.body,
    {
      returnDocument: "after",
      runValidators: true,
    },
  )

  if (!thinkingBlock) {
    return res.status(404).json({
      success: false,
      message: "ThinkingBlock not found",
    })
  }

  res.status(200).json({
    success: true,
    data: thinkingBlock,
  })
})

export const archiveThinkingBlock = asyncHandler(async (req, res) => {
  const thinkingBlock = await ThinkingBlock.findOneAndUpdate(
    {
      _id: req.params.id,
      isArchived: false,
    },
    {
      isArchived: true,
    },
    {
      returnDocument: "after",
    },
  )

  if (!thinkingBlock) {
    return res.status(404).json({
      success: false,
      message: "ThinkingBlock not found",
    })
  }

  res.status(200).json({
    success: true,
    message: "ThinkingBlock archived successfully",
  })
})

export const getThinkingBlocksBySpaceBlock = asyncHandler(async (req, res) => {
  const thinkingBlocks = await ThinkingBlock.find({
    spaceBlockId: req.params.id,
    isArchived: false,
  }).sort({
    updatedAt: -1,
  })

  res.status(200).json({
    success: true,
    count: thinkingBlocks.length,
    data: thinkingBlocks,
  })
})

export const duplicateThinkingBlock = asyncHandler(async (req, res) => {
  const original = await ThinkingBlock.findOne({
    _id: req.params.id,
    isArchived: false,
  })

  if (!original) {
    return res.status(404).json({
      success: false,
      message: "ThinkingBlock not found",
    })
  }

  const duplicate = await ThinkingBlock.create({
    title: `${original.title} Copy`,
    description: original.description,
    icon: original.icon,
    spaceBlockId: original.spaceBlockId,
    thumbnail: original.thumbnail,
    position: original.position,
  })

  const elements = await CanvasElement.find({
    thinkingBlockId: original._id,
    isArchived: false,
  })

  if (elements.length > 0) {
    const duplicatedElements = elements.map((element) => ({
      thinkingBlockId: duplicate._id,
      type: element.type,
      bounds: element.bounds,
      data: element.data,
    }))

    await CanvasElement.insertMany(duplicatedElements)
  }

  res.status(201).json({
    success: true,
    data: duplicate,
  })
})
