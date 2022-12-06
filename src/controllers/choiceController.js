import { choiceCollection, pollCollection, votesCollection } from "../database/db.js";
import { ObjectId } from 'mongodb';
import dayjs from "dayjs";

export async function choicePost(req, res) {
    const choice = res.locals.choice;

    try {
        await choiceCollection.insertOne(choice);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function choiceVotePost(req, res) {
    const { id } = req.params

    try {
        const choiceExist = await choiceCollection.findOne({ _id: new ObjectId(id) })
        if (!choiceExist) {
            res.sendStatus(404)
            return
        }

        const pollExist = await pollCollection.findOne({ _id: new ObjectId(choiceExist.pollId) })
        if (pollExist.expireAt <= dayjs().format("YYYY-MM-DD HH:mm")) {
            res.sendStatus(403)
            return
        }

        await votesCollection.insertOne({
            createdAt: dayjs().format("YYYY-MM-DD HH:mm"),
            choiceId: ObjectId(id)
        });

        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
        return
    }
}