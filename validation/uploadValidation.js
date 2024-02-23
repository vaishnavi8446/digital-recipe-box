const Joi = require("joi");

const getImageFilenameSchema = Joi.object({
  filename: Joi.string().required(),
});

const getImageByIdSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

module.exports = {

  getImageByIdSchema,
  getImageFilenameSchema,
};
