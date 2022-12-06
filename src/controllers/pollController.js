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
        const pollExist = await pollCollection
            .findOne({ _id: new ObjectId(id) })

        if (!pollExist) {
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

export async function pollResult(req, res) {
    const { id } = req.params

    try {

        const poll = await pollCollection.findOne({ _id: ObjectId(id) })
        const choice = await choiceCollection.find({ pollId: ObjectId(id) }).toArray()

        let imostVotes = 0
        let mostVotes = 0
        const votes = await Promise.all(choice.map(async el => {
            const elvotes = await choiceCollection.find({ choiceId: el._id }).toArray()
            return {
                title: el.title,
                votes: elvotes.length
            }
        }));

        votes.forEach((el, i) => {
            if (el.votes > mostVotes) {
                mostVotes = el.votes
                imostVotes = i
            }
        });

        res.send({ ...poll, result: votes[imostVotes] })

    } catch (error) {
        res.sendStatus(500);
        console.log(error)
    }
}