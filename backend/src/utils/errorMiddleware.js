function errorMiddleware(error, req, res, next) {
  if (res.headersSent) {
    next(error);
  } else {
    const status = error.statusCode || 500;
    res.status(status);
    res.json({
      message: error.message,
      data: error.data,
    });
  }
}

module.exports = errorMiddleware;
