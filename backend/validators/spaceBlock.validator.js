import Joi from "joi"
import { iconSchema } from "./icon.validator.js"
import { positionSchema } from "./position.validator.js"

export const createSpaceBlockSchema = Joi.object({
  title: Joi.string()
    .trim()
    .max(80)
    .required(),

  description: Joi.string()
    .max(1000)
    .allow(""),

  icon: iconSchema.required(),

  color: Joi.string()
    .pattern(/^#[0-9A-Fa-f]{6}$/)
    .required(),

  parentSpaceBlockId: Joi.string()
    .hex()
    .length(24)
    .allow(null),

  thumbnail: Joi.string()
    .allow(null, ""),

  position: positionSchema,
});

export const updateSpaceBlockSchema = Joi.object({
  title: Joi.string()
    .trim()
    .max(80),

  description: Joi.string()
    .max(1000)
    .allow(""),

  icon: iconSchema,

  color: Joi.string()
    .pattern(/^#[0-9A-Fa-f]{6}$/),

  parentSpaceBlockId: Joi.string()
    .hex()
    .length(24)
    .allow(null),

  thumbnail: Joi.string()
    .allow(null, ""),

  position: positionSchema,

  isFavorite: Joi.boolean(),
})
.min(1);
