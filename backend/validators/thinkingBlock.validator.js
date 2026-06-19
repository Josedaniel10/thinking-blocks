import Joi from "joi";
import { iconSchema } from "./icon.validator.js";
import { positionSchema } from "./position.validator.js";

export const createThinkingBlockSchema = Joi.object({
  title: Joi.string()
    .trim()
    .max(80)
    .required(),

  description: Joi.string()
    .max(1000)
    .allow(""),

  icon: iconSchema.required(),

  spaceBlockId: Joi.string()
    .hex()
    .length(24)
    .allow(null),

  thumbnail: Joi.string()
    .allow(null, ""),

  position: positionSchema,
});

export const updateThinkingBlockSchema = Joi.object({
  title: Joi.string()
    .trim()
    .max(80),

  description: Joi.string()
    .max(1000)
    .allow(""),

  icon: iconSchema,

  spaceBlockId: Joi.string()
    .hex()
    .length(24)
    .allow(null),

  thumbnail: Joi.string()
    .allow(null, ""),

  position: positionSchema,

  isFavorite: Joi.boolean(),
})
.min(1);
