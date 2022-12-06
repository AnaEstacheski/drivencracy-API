import { choiceCollection, pollCollection } from "../database/db.js";
import { ObjectId } from 'mongodb';
import { choiceSchema } from '../models/choiceShema.js'
import dayjs from "dayjs";

export async function choiceValidation(req, res, next) {
    const { pollId } = req.body
    const choice = req.body
    let today;
    today = dayjs();

    try {
        const research = await pollCollection.findOne({ _id: new ObjectId(pollId) })
        if (!research) {
            res.status(404).send("Poll not find");
            return
        }
        if (today.isAfter(research.expireAt)) {
            res.sendStatus(403)
            return
        }

        const sameTitle = await choiceCollection.findOne({ title: choice.title });
        if (sameTitle) {
            res.sendStatus(409);
            return
        }

        const { error } = choiceSchema.validate(choice, { abortEarly: false })

        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.status(422).send(errors);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }

    res.locals.choice = choice;

    next();
}

