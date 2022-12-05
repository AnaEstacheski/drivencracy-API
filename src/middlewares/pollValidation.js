import { pollSchema } from '../models/pollSchema.js'

export function pollValidation(req, res, next) {
    const { title, expireAt } = req.body;

    let expirationDate = "";

    const poll = {
        title,
        expireAt
    };
  
    const { error } = pollSchema.validate(poll, { abortEarly: false });
  
    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }

    if (!expireAt) {
        console.log(Date.now());
        expirationDate = dayjs(Date.now()).add(30, 'day').format("YYYY-MM-DD HH:mm");
    } else {
        expirationDate = expireAt;
    }

    res.locals.poll = poll;

    next();
}