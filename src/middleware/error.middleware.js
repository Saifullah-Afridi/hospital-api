const errorMiddleware = (err, req, req, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  const status = err.status || "error";
  res.status(statusCode).json({ status, message, stack: err.stack });
};

module.exports = errorMiddleware;
