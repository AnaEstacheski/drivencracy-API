import { pollCollection } from "../database/db.js";
import dayjs from "dayjs";

export async function pollPost(req, res) {
    const poll = res.locals.poll;
    let expirationDate;

    if (!poll.expireAt || poll.expireAt === null || poll.expireAt === " ") {
        expirationDate = dayjs().add(30 , "day").format("YYYY-MM-DD HH:mm")
        poll.expireAt = expirationDate;
    }

    try {
        await pollCollection.insertOne(poll);
        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
        return
    }
}

export async function pollGet(req, res) {

    try {
        const poll = await pollCollection
        .find()
        .toArray();
        res.send(poll);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

}