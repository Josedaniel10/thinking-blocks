import Joi from "joi"

export const iconSchema = Joi.object({
  type: Joi.string().valid("emoji", "lucide", "image").required(),
  value: Joi.string().required(),
})
