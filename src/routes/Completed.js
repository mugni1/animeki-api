import e from 'express';
import { getCompleted } from '../controllers/CompletedController.js';

const router = e.Router();

router.get('/completed', getCompleted);

export default router;
