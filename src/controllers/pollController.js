import { choiceCollection, pollCollection } from "../database/db.js";
import { ObjectId } from 'mongodb';

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

export async function pollGetChoice(req, res) {
    const { id } = req.params

    try {
        const research = await pollCollection
            .findOne({ _id: new ObjectId(id) })

        if (!research) {
            res.status(404).send("Poll not find");
            return
        }
        const response = await choiceCollection.find({ pollId: id })
        .toArray()
        res.send(response)

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
        return
    }
}