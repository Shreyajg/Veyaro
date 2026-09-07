import { Router } from "express";
import { createUser, loginUser } from "../controllers/users.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const userRouter=Router();

userRouter.post('/login',loginUser);
userRouter.post('/create',createUser);

userRouter.get('/test-auth', verifyJWT, (req, res) => {
    res.status(200).json({
        success: true,
        message: 'JWT authentication working',
        user: req.user,
    });
});

export default userRouter;