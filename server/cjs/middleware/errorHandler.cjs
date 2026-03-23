module.exports = (err, req, res, next) => {
    console.error('❌ 错误:', err);
    let statusCode = err.statusCode || 500;
    let errorCode = err.code || 'SERVER_ERROR';
    let message = err.message || '服务器内部错误';
    if (err.name === 'ValidationError') {
        statusCode = 400;
        errorCode = 'VALIDATION_ERROR';
    }
    if (err.name === 'UnauthorizedError') {
        statusCode = 401;
        errorCode = 'UNAUTHORIZED';
        message = '认证失败，请重新登录';
    }
    if (process.env.NODE_ENV === 'development') {
        message = err.message;
    }
    res.status(statusCode).json({
        success: false,
        error: { code: errorCode, message: message, details: err.details || null },
        timestamp: new Date().toISOString()
    });
};
