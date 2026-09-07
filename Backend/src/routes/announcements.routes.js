import { Router } from 'express';

import { createAnnouncement, getAnnouncements } from '../controllers/announcements.controllers.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/role.middleware.js';

const announcementRouter = Router();

announcementRouter.post(
    '/create',
    verifyJWT,
    requireRole('Admin'),
    createAnnouncement
);
announcementRouter.get('/',
    verifyJWT,
    getAnnouncements,
)
export default announcementRouter;