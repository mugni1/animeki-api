import e from 'express';
import { getAnimeByStudio, getStudios } from '../controllers/StudioController.js';

const router = e.Router();

router.get('/studios', getStudios);
router.get('/studio/:slug', getAnimeByStudio);

export default router;
