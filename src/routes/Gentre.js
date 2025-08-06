import e from 'express';
import { getAnimeByGentre, getGentres } from '../controllers/GentreController.js';

const router = e.Router();

router.get('/gentres', getGentres);
router.get('/gentre/:slug', getAnimeByGentre);

export default router;
