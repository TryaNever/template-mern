const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: statusCode === 500
      ? "Erreur interne du serveur"
      : err.message
  });
};

export default errorMiddleware;