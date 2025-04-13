import express from 'express';
import * as house from '../controllers/houseController.js';
import * as auth from '../controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * /api/v0/house:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     description: Create house
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *             required:
 *               - name
 *               - type
 *     responses:
 *       201:
 *         description: House created
 *       409:
 *         description: User already in house
 *       default:
 *         description: Unexpected Error
 */
router.post('/', auth.check, async (req, res) => {
  try {
    const result = await house.post(req);
    res.status(201).send(result);
  } catch (error) {
    console.log(error.message)
    if (error) {
      res.status(409).send();
    }
  }
});

/**
 * @swagger
 * /api/v0/house:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     description: Get house
 *     responses:
 *       200:
 *         description: Found house
 *       404:
 *         description: Not in a house
 *       default:
 *         description: Unexpected Error
 */
router.get('/', auth.check, async (req, res) => {
  try {
    const result = await house.get(req);
    res.status(200).send(result);
  } catch (error) {
    if (error) {
      res.status(404).send();
    }
  }
});

export default router;
