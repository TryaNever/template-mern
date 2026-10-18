const NotfoundMiddleware = (req, res, next) => {
  res.status(404).json({
    success: false,
    status: 404,
    message: "Ressource Introuvable"
  });
};

export default NotfoundMiddleware;  