import { pollCollection } from "../database/db.js";

export async function pollPost(req, res) {
    
    const poll = res.locals.poll;

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