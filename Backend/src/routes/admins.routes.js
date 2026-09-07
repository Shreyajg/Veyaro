import { Router } from 'express';

import { createAdmin } from '../controllers/admins.controllers.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/role.middleware.js';

const adminRouter = Router();

adminRouter.post(
    '/create',
    verifyJWT,
    requireRole('Admin'),
    createAdmin
);

export default adminRouter;