import { Router } from 'express';
import { createYearGroup } from '../controllers/yearGroups.controllers.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/role.middleware.js';

const yearGroupRouter = Router();

yearGroupRouter.post('/create', verifyJWT, requireRole('Admin'),createYearGroup);

export default yearGroupRouter;