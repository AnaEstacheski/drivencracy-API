import { pollSchema } from '../models/pollSchema.js'
import dayjs from "dayjs"

export function pollValidation(req, res, next) {
    let { title, expireAt } = req.body;
    let expirationDate;

    if (!expireAt || expireAt === null || expireAt === " ") {
        expirationDate = dayjs().add(30 , "day").format("YYYY-MM-DD HH:mm")
        expireAt = expirationDate;
    }

    const poll = {
        title,
        expireAt
    };

    const { error } = pollSchema.validate(poll, { abortEarly: false });
  
    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }

    res.locals.poll = poll;

    next();
}