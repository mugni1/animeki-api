import e from 'express';
import { getSearchAnime } from '../controllers/SearchController.js';
const router = e.Router();

router.get('/search', getSearchAnime);

export default router;
