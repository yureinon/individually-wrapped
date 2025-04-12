import express from 'express';
import * as user from '../controllers/userController.js';

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
    if (error) {
      res.status(409).send();
    }
  }
});

  /**
   * @swagger
   * /api/v0/user:
   *   get:
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
  router.get('/', async (req, res) => {
    try {
      const result = await user.get(req);
      res.status(200).send(result);
    } catch (error) {
      if (error) {
        res.status(404).send();
      }
    }
  });

export default router;
