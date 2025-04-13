import express from 'express';
import * as user from '../controllers/userController.js';
import * as auth from '../controllers/authController.js';

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
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - name
 *               - password
 *     responses:
 *       201:
 *         description: User created
 *       409:
 *         description: Email already registered
 *       default:
 *         description: Unexpected Error
 */
router.post('/', async (req, res) => {
  try {
    await user.signup(req);
    res.status(201).send();
  } catch (error) {
    if (error.message == 'Email already registered') {
      res.status(409).send();
    }
  }
});

/**
 * @swagger
 * /api/v0/user:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     description: User signup
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email of user fetch
 *     responses:
 *       200:
 *         description: OK
 *       default:
 *         description: Unexpected Error
 */
router.get('/', auth.check, async (req, res) => {
  try {
    const result = await user.get(req);
    res.status(200).send(result);
  } catch (error) {
    if (error) {
      res.status(404).send();
    }
  }
});

/**
 * @swagger
 * /api/v0/user/{status}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     description: Change user status
 *     parameters:
 *       - in: path
 *         name: status
 *         schema:
 *           type: string
 *         required: true
 *         description: New status
 *     responses:
 *       200:
 *         description: OK
 *       default:
 *         description: Unexpected Error
 */
router.put('/:status', auth.check, async (req, res) => {
  const result = await user.put(req);
  res.status(200).send(result);
});

export default router;
