const Joi = require('joi');

const markNotificationAsReadSchema = Joi.object({
  read: Joi.boolean().required(),
});

const deleteNotificationSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

module.exports = {
    markNotificationAsReadSchema,
    deleteNotificationSchema,
}