import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// dotenv connection
dotenv.config();

// mongodb connection
const mongoClient = new MongoClient(process.env.MONGO_URI);

// top-level await
try {
    await mongoClient.connect();
    console.log("MongoDB connected!");
} catch (err) {
    console.log(err);
}

const db = mongoClient.db("drivencracy");

export const pollCollection = db.collection("poll");
export const choiceCollection = db.collection("choice");
export const votesCollection = db.collection("votes");