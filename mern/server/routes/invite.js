import express from 'express';
import * as invite from '../controllers/inviteController.js';
import * as auth from '../controllers/authController.js';

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
router.post('/:email', auth.check, async (req, res) => {
  try {
    const { id } = req.user;
    await invite.post(id, req.params.email);
    res.status(201).send();
  } catch (error) {
    if (error.message == 'Invite already exists') {
      res.status(409).send();
    } else {
      res.status(404).send();
    }
  }
});

/**
 * @swagger
 * /api/v0/invite/inbound:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     description: Inbound invitations
 *     responses:
 *       200:
 *         description: Found inbound invitations
 *       default:
 *         description: Unexpected Error
 */
router.get('/inbound', auth.check, async (req, res) => {
  const { id } = req.user;
  const result = await invite.getInbound(id);
  res.status(200).send(result);
});

/**
 * @swagger
 * /api/v0/invite/outbound:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     description: Outbound invitations
 *     responses:
 *       200:
 *         description: Found outbound invitations
 *       default:
 *         description: Unexpected Error
 */
router.get('/outbound', auth.check, async (req, res) => {
  const { id } = req.user;
  const result = await invite.getOutbound(id);
  res.status(200).send(result);
});

export default router;
