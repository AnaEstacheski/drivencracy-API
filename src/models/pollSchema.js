import Joi from "joi";

export const pollSchema = Joi.object({
    title: Joi.string().required(),
    expireAt: Joi.date().required()
});