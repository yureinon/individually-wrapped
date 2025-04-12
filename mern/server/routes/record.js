import express from "express";
import db from "../db/connection.js"
import {ObjectId} from "mongodb"

const router = express.Router();

export default router;

/**
 * @swagger
 * /api/v0/record:
 *   get:
 *     responses:
 *       200:
 *         description: Users Found
 *       default:
 *         description: Unexpected Error
 */
router.get("/", async (req, res) => {
  let collection = await db.collection("user");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
})