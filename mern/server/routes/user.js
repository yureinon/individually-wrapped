import express from "express";
import db from "../db/connection.js";
import * as user from "../controllers/userController.js";

const router = express.Router();

/**
 * @swagger
 * /api/v0/user:
 *   post:
 *     description: User signup
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User created
 *       409:
 *         description: Email already registered
 *       default:
 *         description: Unexpected Error
 */
router.post("/", async (req, res) => {
  try {
    user.signup(req)
    res.send(results).status(200);
  } catch (error) {
    if (error) {
      res.send().status(409);
    }
  }
})

export default router;
