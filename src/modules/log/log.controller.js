import express from "express";
import { createCappedLogs, insertLog } from "./log.service.js";

const router = express.Router();
router.post("/collection/capped", createCappedLogs);
router.post("/", async (req, res) => {
  const result = await insertLog(req.body);
  res.json(result);
});

export default router;
