import e from 'express';
import { getSchedule } from '../controllers/ScheduleController.js';
const router = e.Router();

router.get('/schedule', getSchedule);

export default router;
