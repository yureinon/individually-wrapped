import express from 'express';
import * as event from '../controllers/eventController.js';
import * as auth from '../controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * /api/v0/event:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     description: Create event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               start:
 *                 type: string
 *               end:
 *                 type: string
 *             required:
 *               - name
 *               - start
 *               - end
 *     responses:
 *       201:
 *         description: Event created
 *       default:
 *         description: Unexpected Error
 */
router.post('/', auth.check, async (req, res) => {
  await event.post(req);
  res.status(201).send();
});

/**
 * @swagger
 * /api/v0/event/{day}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     description: Get events
 *     parameters:
 *       - in: path
 *         name: day
 *         schema:
 *           type: string
 *         required: true
 *         description: Day of events
 *     responses:
 *       200:
 *         description: Events returned
 *       default:
 *         description: Unexpected Error
 */
router.get('/:day', auth.check, async (req, res) => {
  const result = await event.getAll(req);
  res.status(200).send(result);
});

export default router;
