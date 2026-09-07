import { Router } from 'express';

import { createClass, getMyClasses } from '../controllers/classes.controllers.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/role.middleware.js';

const classRouter = Router();

classRouter.post(
    '/create',
    verifyJWT,
    requireRole('Admin'),
    createClass
);
classRouter.get(
    '/',
    verifyJWT,
    requireRole('Student','Teacher'),
    getMyClasses
)

export default classRouter;