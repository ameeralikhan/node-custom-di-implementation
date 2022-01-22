import * as express from 'express';
import PingController from '../controllers/ping';

const router = express.Router();
const ctrl = new PingController();

/**
 * @swagger
 * /api/v1/ping:
 *   get:
 *     tags:
 *     - "Ping"
 *     description: Check server heartbeat
 *     responses:
 *       200:
 *         description: A successful response.
 */
router.get(`/`, ctrl.get);

export default router;
