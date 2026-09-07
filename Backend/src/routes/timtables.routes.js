import { Router } from 'express';

import {
    createTimetable,
    getMyTimetable
} from '../controllers/timetables.controllers.js';

import { verifyJWT } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/role.middleware.js';

const timeRouter = Router();

timeRouter.post(
    '/create',
    verifyJWT,
    requireRole('Admin'),
    createTimetable
);

timeRouter.get(
    '/',
    verifyJWT,
    requireRole('Student'),
    getMyTimetable
);

export default timeRouter;