import { ApiError } from '../utils/apiError.js';

const requireRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            throw new ApiError(401, "User not authenticated");
        }

        if (!allowedRoles.includes(req.user.role)) {
            throw new ApiError(403, "You are not authorized to perform this action");
        }

        next();
    };
};

export { requireRole };