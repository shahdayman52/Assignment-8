import express from "express";
import { databaseConnection } from "./database/connection.js";
import authRouter from "./modules/author/author.controller.js";
import logRouter from "./modules/log/log.controller.js";
import bookRouter from "./modules/book/book.controller.js";


export const bootstrap = async() => {
  const app = express();
  app.use(express.json());

  await databaseConnection();

  app.use('/auth',authRouter)
  app.use('/logs',logRouter)
  app.use('/books',bookRouter)
  app.listen(3000, () => {
    console.log("Runnin in port 3000");
  });
};
