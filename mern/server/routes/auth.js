import express from "express";
import * as auth from "../controllers/authController.js";

const router = express.Router();

/**
 * @swagger
 * /api/v0/login:
 *   post:
 *     requestBody:
 *       description:
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
 *       200:
 *         description: User logged in
 *       401:
 *         description: User not found
 *       default:
 *         description: Unknown Error
 */
router.post("/", async (req, res) => {
  try {
    const results = await auth.login(req);
    res.send(results).status(200);
  } catch(error) {
    if (error) {
      console.log(error.message);
      res.status(404).send();
    }
  }
})

export default router;
