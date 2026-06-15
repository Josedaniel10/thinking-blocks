import Joi from "joi";

export const createThinkingBlockSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(1)
    .max(80)
    .required(),

  icon: Joi.object({
    type: Joi.string()
      .valid("emoji", "ludcie", "image")
      .required(),

    value: Joi.string()
      .required()
  }).required(),

  spaceBlockId: Joi.string()
    .hex()
    .length(24)
    .required()
});

export const updateThinkingBlockSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(1)
    .max(80),

  icon: Joi.object({
    type: Joi.string()
      .valid("emoji", "lucide", "image"),

    value: Joi.string()
  }).min(1)
}).min(1);
