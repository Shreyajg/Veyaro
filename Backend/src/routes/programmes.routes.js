import { Router } from 'express';
import { createProgramme } from '../controllers/programmes.controllers.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const programmeRouter = Router();

programmeRouter.post('/create', verifyJWT, createProgramme);

export default programmeRouter;