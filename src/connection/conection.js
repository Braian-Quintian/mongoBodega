import { MongoClient } from "mongodb";
import credentials from "./credentials.js";

export async function connect() {
    try {
        const uri = `mongodb+srv://${credentials.userDB}:${credentials.passDB}@${credentials.cluster}.mongodb.net/${credentials.dbDB}`;
        const options = { useNewUrlParser: true, useUnifiedTopology: true };
        const client = await MongoClient.connect(uri, options);
        return client.db();
    } catch (error) {
        return { status: 500, message: error.message };
    }
}
