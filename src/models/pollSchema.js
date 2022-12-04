import joi from "joi";
import DateExtension from "@joi/date"
import JoiImport from 'joi';

const Joi = JoiImport.extend(DateExtension)

export const pollSchema = joi.object({
    title: joi.string().required(),
    expireAt: Joi.date().format("YYYY-MM-DD HH:mm").required()
});