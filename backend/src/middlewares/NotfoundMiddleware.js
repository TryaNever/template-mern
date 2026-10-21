const NotfoundMiddleware = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Ressource introuvable',
    })
}

export default NotfoundMiddleware
