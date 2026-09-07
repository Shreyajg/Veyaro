import { Router } from 'express';

import { createTeacher } from '../controllers/teachers.controllers.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/role.middleware.js';

const teacherRouter = Router();

teacherRouter.post(
    '/create',
    verifyJWT,
    requireRole('Admin'),
    createTeacher
);

export default teacherRouter;