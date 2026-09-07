import { Router } from "express";
import { createStudent, getMyProfile } from "../controllers/students.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

const studentRouter=Router();

studentRouter.get('/profile',verifyJWT,getMyProfile);
studentRouter.post('/create',verifyJWT,requireRole('Admin','Teacher'),createStudent);
export default studentRouter;