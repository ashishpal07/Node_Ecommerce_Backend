
module.exports.notFound = (req, res, next) => {
    const error = new Error(`NOT FOUND ${req.originalUrl}`);
    res.status(404);
    next(error);
}

module.exports.errorHandler = (err, req, res, next) => {
    const statuscode = res.statusCode == 200 ? 500 : res.statusCode;
    req.status(statuscode);
    res.json({
        message: err?.message,
        stack: err?.stack
    });
}