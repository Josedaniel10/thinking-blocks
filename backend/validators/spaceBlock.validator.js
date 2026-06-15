import Joi from "joi"

export const createSpaceBlockSchema = Joi.object({
  title: Joi.string().trim().min(1).max(80).required(),
  icon: Joi.object({
    type: Joi.string().valid("emoji", "lucide", "image").required(),

    value: Joi.string().max(50).required(),
  }).required(),
  color: Joi.string()
    .pattern(/^#([A-Fa-f0-9]{6})$/)
    .required(),
})

export const updateSpaceBlockSchema = Joi.object({
  title: Joi.string().trim().min(1).max(80),

  icon: Joi.object({
    type: Joi.string().valid("emoji", "lucide", "image"),

    value: Joi.string().max(50),
  }).min(1),

  color: Joi.string().pattern(/^#([A-Fa-f0-9]{6})$/),
}).min(1)

