import express from "express";
import * as invite from "../controllers/inviteController.js";
import * as auth from "../controllers/authController.js";

const router = express.Router();

/**
 * @swagger
 * /api/v0/invite/{email}:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     description: Send invite to email
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email of person to invite
 *     responses:
 *       201:
 *         description: Invite created
 *       404:
 *         description: User house not found
 *       default:
 *         description: Unexpected Error
 */
router.post("/:email", auth.check, async (req, res) => {
  try {
    const { id } = req.user;
    await invite.post(id, req.params.email);
    res.status(201).send();
  } catch (error) {
    if (error.message == "Invite already exists") {
      res.status(409).send();
    } else {
      res.status(404).send();
    }
  }
});

export default router;
