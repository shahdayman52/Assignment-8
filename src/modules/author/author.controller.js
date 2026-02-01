import express from "express";
import { createAuthor } from "./author.service.js";

const router = express.Router();
router.post("/collection/", async (req, res) => {
  const result = await createAuthor(req.body);
  res.json(result);
});

export default router;