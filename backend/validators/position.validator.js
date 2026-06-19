import Joi from "joi"

export const positionSchema = Joi.object({
  x: Joi.number().required(),
  y: Joi.number().required(),
})
