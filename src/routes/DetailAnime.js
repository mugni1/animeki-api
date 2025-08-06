import e from 'express';
import { getDetailAnime } from '../controllers/DetailAnimeController.js';

const router = e.Router();

router.get('/detail/:slug', getDetailAnime);

export default router;
