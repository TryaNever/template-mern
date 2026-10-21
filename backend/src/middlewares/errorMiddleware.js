const errorMiddleware = (err, req, res, next) => {
    if (res.headersSent) {
        next(err)
        return
    }

    let statusCode = err.statusCode
    if (!statusCode && err.name === 'ValidationError') {
        statusCode = 400
    } else if (!statusCode && err.code === 11000) {
        statusCode = 409
    } else if (!statusCode) {
        statusCode = 500
    }
    const message = statusCode === 500 ? 'Erreur interne du serveur' : err.message

    if (statusCode === 500) {
        console.error(err)
    }

    res.status(statusCode).json({
        success: false,
        message,
    })
}

export default errorMiddleware
