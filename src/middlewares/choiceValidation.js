import { choiceCollection, pollCollection } from "../database/db.js";
import { ObjectId } from 'mongodb';
import { choiceSchema } from '../models/choiceShema.js'
import dayjs from "dayjs";

const repeat = async (title) => {
    const findtitle = await choiceCollection.findOne({ title })
    return findtitle
}

export async function choiceValidation(req, res, next) {
    const { title, pollId } = req.body

    const research = await pollCollection.findOne({ _id: ObjectId(pollId) })

    try {

        if (research.expireAt <= dayjs().format('YYYY-MM-DD HH:mm')) {
            res.sendStatus(403);
            return
        }

        if (!research) {
            res.status(404).send("Poll not find");
            return
        }

        const choice = {
            title,
            pollId: ObjectId(pollId)
        }

        const { error } = choiceSchema.validate(choice, { abortEarly: false })

        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.status(422).send(errors);
        }

        if (await repeat(title)) {
            res.sendStatus(409);
            return
        }

    } catch (err) {
        res.status(500).send(err.message);
    }

    res.locals.choice = choice;

    next();
}

