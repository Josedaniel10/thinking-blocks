import SpaceBlock from "../models/SpaceBlock.js"
import asyncHandler from "../utils/asyncHandler.js"

export const createSpaceBlock = asyncHandler(async (req, res) => {
  const { title, icon, color } = req.body

  const spaceBlock = await SpaceBlock.create({
    title,
    icon,
    color,
  })

  res.status(201).json({
    success: true,
    data: spaceBlock,
  })
})

export const getSpaceBlocks = asyncHandler(async (req, res) => {
  const spaceBlocks = await SpaceBlock.find({ isArchived: false }).sort({
    updatedAt: -1,
  })

  return res.status(200).json({
    success: true,
    count: spaceBlocks.length,
    data: spaceBlocks,
  })
})

export const getSpaceBlockById = asyncHandler(async (req, res) => {
  const { id } = req.params

  const spaceBlock = await SpaceBlock.findOne({
    _id: id,
    isArchived: false,
  })

  if (!spaceBlock) {
    return res.status(404).json({
      success: false,
      message: "SpaceBlock not found",
    })
  }

  return res.status(200).json({
    success: true,
    data: spaceBlock,
  })
})

export const updateSpaceBlock = asyncHandler(async (req, res) => {
  const { id } = req.params

  const updatedSpaceBlock = await SpaceBlock.findOneAndUpdate(
    {
      _id: id,
      isArchived: false,
    },
    req.body,
    {
      returnDocument: "after",
      runValidators: true,
    },
  )

  if (!updatedSpaceBlock) {
    return res.status(404).json({
      success: false,
      message: "SpaceBlock not found",
    })
  }

  return res.status(200).json({
    success: true,
    data: updatedSpaceBlock,
  })
})

export const archiveSpaceBlock = asyncHandler(async (req, res) => {
  const { id } = req.params

  const archivedSpaceBlock = await SpaceBlock.findOneAndUpdate(
    {
      _id: id,
      isArchived: false,
    },
    {
      isArchived: true,
    },
    {
      returnDocument: "after",
    },
  )

  if (!archivedSpaceBlock) {
    return res.status(404).json({
      success: false,
      message: "SpaceBlock not found",
    })
  }

  return res.status(200).json({
    success: true,
    message: "SpaceBlock archived successfully",
  })
})
