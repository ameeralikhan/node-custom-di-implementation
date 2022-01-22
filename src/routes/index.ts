import * as express from 'express';
import config from '../../config';
import ping from './ping';
import book from './book';

const router = express.Router();

router.use(`${config.api.baseURL}/ping`, ping);
router.use(`${config.api.baseURL}/books`, book);

export default () => router;
