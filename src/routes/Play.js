import e from 'express';
import { getEpisode } from '../controllers/PlayController.js';

const router = e.Router();

router.get('/play/:slug', getEpisode);

export default router;
