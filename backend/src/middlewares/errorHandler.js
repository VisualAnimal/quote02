const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // 打印错误堆栈信息

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
};

module.exports = errorHandler;
