import { ApiError } from '../utils/apiError.js';

const errorHandler = (err, req, res, next) => {
    console.error('ERROR:', err);

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors,
        });
    }

    return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
    });
};

export { errorHandler };