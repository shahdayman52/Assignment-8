import { db } from "../../database/connection.js";

//Q2
export const createAuthor = async (data) => {
  const result = await db.collection("authors").insertOne(data);
  return result;
}; 

