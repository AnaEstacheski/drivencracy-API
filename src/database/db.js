import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// dotenv connection
dotenv.config();

// mongodb connection
const mongoClient = new MongoClient(process.env.MONGO_URI);

// top-level await
try {
    await mongoClient.connect();
    console.log("MongoDB Connected!");
} catch (err) {
    console.log(err)
}

const db = mongoClient.db("drivencracy");

export const usersCollection = db.collection("poll");
export const sessionsCollection = db.collection("options");
export const productsCollection = db.collection("votes");