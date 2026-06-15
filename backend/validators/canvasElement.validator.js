import Joi from "joi";

export const createCanvasElementSchema = Joi.object({
  thinkingBlockId: Joi.string()
    .hex()
    .length(24)
    .required(),

  type: Joi.string()
    .valid(
      "text",
      "image",
      "video",
      "file",
      "table",
      "drawing",
      "thinking_block_reference"
    )
    .required(),

  bounds: Joi.object({
    x: Joi.number().required(),
    y: Joi.number().required(),

    width: Joi.number()
      .positive()
      .required(),

    height: Joi.number()
      .positive()
      .required()
  }).required(),

  data: Joi.object().required()
});

export const updateCanvasElementSchema = Joi.object({
  type: Joi.string().valid(
    "text",
    "image",
    "video",
    "file",
    "table",
    "drawing",
    "thinking_block_reference"
  ),

  bounds: Joi.object({
    x: Joi.number(),
    y: Joi.number(),
    width: Joi.number().positive(),
    height: Joi.number().positive()
  }).min(1),

  data: Joi.object()
}).min(1);