import { pollSchema } from '../models/pollSchema.js'
import dayjs from "dayjs"

export function pollValidation(req, res, next) {
    const poll = req.body;

    const { error } = pollSchema.validate(poll, { abortEarly: false });
  
    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }

    res.locals.poll = poll;

    next();
}