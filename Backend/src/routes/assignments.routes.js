import { Router } from 'express';

import { createAssignment, getAssignment } from '../controllers/assignments.controllers.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/role.middleware.js';

const assignmentRouter = Router();

assignmentRouter.post(
    '/create',
    verifyJWT,
    requireRole('Teacher'),
    createAssignment
);
assignmentRouter.get(
    '/',
    verifyJWT,
    requireRole('Student'),
    getAssignment
)

export default assignmentRouter;