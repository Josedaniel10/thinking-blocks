import Joi from "joi"

export const boundsSchema = Joi.object({
  x: Joi.number().required(),

  y: Joi.number().required(),

  width: Joi.number().positive().required(),

  height: Joi.number().positive().required(),
})

export const partialBoundsSchema = Joi.object({
  x: Joi.number(),

  y: Joi.number(),

  width: Joi.number().positive(),

  height: Joi.number().positive(),
}).min(1)
