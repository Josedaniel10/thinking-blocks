import Joi from "joi"
import { boundsSchema, partialBoundsSchema } from "./bounds.validator.js"

export const createCanvasElementSchema = Joi.object({
  thinkingBlockId: Joi.string().hex().length(24).required(),

  type: Joi.string()
    .valid(
      "text",
      "image",
      "video",
      "file",
      "table",
      "drawing",
      "thinking_block_reference",
    )
    .required(),

  bounds: boundsSchema.required(),

  data: Joi.object().unknown(true).default({}),
})

export const updateCanvasElementSchema = Joi.object({
  type: Joi.string().valid(
    "text",
    "image",
    "video",
    "file",
    "table",
    "drawing",
    "thinking_block_reference",
  ),

  bounds: partialBoundsSchema,

  data: Joi.object().unknown(true),
}).min(1)
