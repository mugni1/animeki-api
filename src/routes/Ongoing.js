import e from 'express';
import { getOngoing } from '../controllers/OngoingController.js';

const router = e.Router();

router.get('/ongoing', getOngoing);

export default router;
