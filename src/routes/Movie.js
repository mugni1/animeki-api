import e from 'express';
import { getMovie } from '../controllers/MovieController.js';

const router = e.Router();

router.get('/movie', getMovie);

export default router;
