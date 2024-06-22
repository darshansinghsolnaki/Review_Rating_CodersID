const { MinKey } = require("mongodb")

const Joi = require('joi')

const taskSchema = Joi.object({
    name : Joi.string().Min(3).required(),
    completd : Joi.boolean()
});

exports.validateTask = (tack) => taskSchema.validate(Task)
