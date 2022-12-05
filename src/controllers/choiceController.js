import { choiceCollection, pollCollection } from "../database/db.js";
import { ObjectId } from 'mongodb';

export async function choicePost (req, res) {
    const choice = res.locals.choice;

    try {
        await choiceCollection.insertOne(choice);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}