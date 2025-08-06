import e from 'express';
import { getAnimeByCast } from '../controllers/ActorCastController.js';

const router = e.Router();

router.get('/cast/:slug', getAnimeByCast);

export default router;
