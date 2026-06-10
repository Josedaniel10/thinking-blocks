import ThinkingBlock from "../models/ThinkingBlock"
import CanvasElement from "../models/CanvasElement"
import asyncHandler from "../utils/asyncHandler"

export const createThinkingBlock = asyncHandler(async (req, res) => {
  const thinkingBlock = await ThinkingBlock.create(req.body)

  res.status(201).json({
    success: true,
    data: thinkingBlock,
  })
})

export const getThinkingBlockById = asyncHandler(async (req, res) => {
  const thinkingBlock = await ThinkingBlock.findOne({
    id: req.params.id,
    isArchived: false,
  })

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

export const updateThinkingBlock = asyncHandler(async (req, res) => {
  const thinkingBlock = await ThinkingBlock.findOneAndUpdate(
    {
      _id: req.params.id,
      isArchived: false,
    },
    req.body,
    {
      new: true,
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
      new: true,
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
    id: req.params.id,
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
    icon: original.icon,
    spaceBlockId: original.spaceBlockId,
  })

  const elements = await CanvasElement.find({
    thinkingBlockId: original._id,
    isArchived: false,
  })

  if (elements.length > 0) {
    const duplicatedElements = elements.map((element) => ({
      thinkingBlockId: duplicate.id,
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

