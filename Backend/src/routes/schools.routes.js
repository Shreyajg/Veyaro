import { Router } from "express";
import { createSchool } from "../controllers/schools.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

const schoolRouter= Router();

schoolRouter.post('/create',verifyJWT,requireRole('Admin'),createSchool);
export default schoolRouter;