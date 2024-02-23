const Joi = require("joi");

const recipeIdSchema = Joi.object({
  id: Joi.number().required(),
});

const createRecipeSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  ingredients: Joi.string().required(),
  instructions: Joi.string().required(),
});

const updateRecipeSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  ingredients: Joi.string(),
  instructions: Joi.string(),
});

module.exports = {
  recipeIdSchema,
  createRecipeSchema,
  updateRecipeSchema,
};
