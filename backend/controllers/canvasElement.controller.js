import CanvasElement from "../models/CanvasElement.js"
import ThinkingBlock from "../models/ThinkingBlock.js"
import asyncHandler from "../utils/asyncHandler.js"
import { validateThinkingBlockExists } from "../utils/validateExists.js"
import deepMerge from "../utils/deepMerge.js"


export const createCanvasElement = asyncHandler(async (req, res) => {
  if (
    req.body.thinkingBlockId &&
    !(await validateThinkingBlockExists(req.body.thinkingBlockId))
  ) {
    return res.status(400).json({
      success: false,
      message: "The assigned ThinkingBlock does not exist",
    })
  }

  const canvasElement = await CanvasElement.create(req.body)

  res.status(201).json({
    success: true,
    data: canvasElement,
  })
})

export const getCanvasElementById = asyncHandler(async (req, res) => {
  const canvasElement = await CanvasElement.findOne({
    _id: req.params.id,
    isArchived: false,
  })

  if (!canvasElement) {
    return res.status(404).json({
      success: false,
      message: "CanvasElement not found",
    })
  }

  res.status(200).json({
    success: true,
    data: canvasElement,
  })
})

export const getElementsByThinkingBlock = asyncHandler(async (req, res) => {
  const elements = await CanvasElement.find({
    thinkingBlockId: req.params.id,
    isArchived: false,
  })

  res.status(200).json({
    success: true,
    count: elements.length,
    data: elements,
  })
})

export const updateCanvasElement = asyncHandler(async (req, res) => {
  if (
    req.body.thinkingBlockId &&
    !(await validateThinkingBlockExists(req.body.thinkingBlockId))
  ) {
    return res.status(400).json({
      success: false,
      message: "The assigned ThinkingBlock does not exist",
    })
  }

  const canvasElement = await CanvasElement.findOne({
    _id: req.params.id,
    isArchived: false,
  })

  if (!canvasElement) {
    return res.status(404).json({
      success: false,
      message: "CanvasElement not found",
    })
  }

  deepMerge(canvasElement, req.body)

  canvasElement.version += 1
  await canvasElement.save()

  res.status(200).json({
    success: true,
    data: canvasElement,
  })
})

export const archiveCanvasElement = asyncHandler(async (req, res) => {
  const canvasElement = await CanvasElement.findOneAndUpdate(
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

  if (!canvasElement) {
    return res.status(404).json({
      success: false,
      message: "CanvasElement not found",
    })
  }

  res.status(200).json({
    success: true,
    message: "CanvasElement archived successfully",
  })
})
