import express from "express";
import * as chore from "../controllers/choreController.js";
import * as auth from "../controllers/authController.js";

const router = express.Router();

/**
 * @swagger
 * /api/v0/chore:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     description: Create chores
 *     requestBody:
 *       description: Starting members for each chore
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                   format: email
 *               required:
 *                 - name
 *                 - email
 *     responses:
 *       201:
 *         description: Chores created
 *       404:
 *         description: User does not exist
 *       default:
 *         description: Unexpected Error
 */
router.post("/", auth.check, async (req, res) => {
  try {
    const { id } = req.user;
    await chore.post(id, req.body);
    res.status(201).send();
  } catch (error) {
    if (
      error.message == "House does not exist for user" ||
      error.message == "User does not exist in house"
    ) {
      res.status(404).send();
    } else {
      res.status(500).send();
    }
  }
});

/**
 * @swagger
 * /api/v0/chore:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     description: Changes chore's user to next user
 *     responses:
 *       200:
 *         description: Chores updated
 *       404:
 *         description: User does not exist
 *       default:
 *         description: Unexpected Error
 */
router.put("/", auth.check, async (req, res) => {
  try {
    const { id } = req.user;
    await chore.put(id);
    res.status(200).send();
  } catch (error) {
    if (error.message == "House does not exist for user") {
      res.status(404).send();
    } else {
      res.status(500).send();
    }
  }
});

/**
 * @swagger
 * /api/v0/chore/completed:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     description: Toggles chore's completion
 *     requestBody:
 *       description: Chore to toggle completion
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: Chores updated
 *       409:
 *         description: Can not toggle other user's chore
 *       default:
 *         description: Unexpected Error
 */
router.put("/completed", auth.check, async (req, res) => {
  try {
    const { id } = req.user;
    await chore.toggleCompleted(id, req.body.name);
    res.status(200).send();
  } catch (error) {
    if (error.message == "Can not toggle other user's chore") {
      res.status(409).send();
    } else {
      res.status(500).send();
    }
  }
});

/**
 * @swagger
 * /api/v0/chore:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     description: Get's all chores
 *     responses:
 *       200:
 *         description: Chores found
 *       default:
 *         description: Unexpected Error
 */
router.get("/", auth.check, async (req, res) => {
  try {
    const result = await chore.get();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send();
  }
});

export default router;
