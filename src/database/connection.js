import { MongoClient } from "mongodb";

const uri = "mongodb://127.0.0.1:27017/bookStore";
const client = new MongoClient(uri);
export const db= client.db('nodejs')

export const databaseConnection = async () => {
  try {
    await client.connect().then(() => {
      console.log("connected to mongoDB");
    });
  } catch (error) {
    console.log(error);
  }
};
