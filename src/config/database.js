import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const URI =
    `mongodb+srv://eduardo:${process.env.MONGO_CLUSTER_PASSWORD}@cluster0.hscoo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const client = new MongoClient(URI);
let db;

async function connectingToDatabase() {
    try {
        await client.connect();
        db = client.db("english-management") || [];
        // console.log(db);
        console.log("Connected successfuly");
        
    } catch (e) {
        console.log(e);
    }
}

function getDb() {
    if (db) {
        return db;
    } else {
        return [];
    }
}

export { connectingToDatabase, db, getDb};
