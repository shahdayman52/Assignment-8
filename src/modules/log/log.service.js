import { db } from "../../database/connection.js    ";

//Q3
export const createCappedLogs = async (req, res) => {
  await db.createCollection("logs", {
    capped: true,
    size: 1024 * 1024,
  });

  res.json({ message: "created capped logs collection" });
};

//Q7
export const insertLog = async (data) => {
  const result = await db.collection("logs").insertOne(data);
  return result;
};
