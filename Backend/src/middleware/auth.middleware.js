import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/apiError.js';

const verifyJWT = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new ApiError(
                401,
                'Access token is required'
            );
        }

        const token = authHeader.split(' ')[1];

        const decodedToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decodedToken;

        next();

    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }

        throw new ApiError(
            401,
            'Invalid or expired access token'
        );
    }
};

export { verifyJWT };