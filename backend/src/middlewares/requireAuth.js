import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import AppError from '../utils/AppError.js'

const requireAuth = (req, res, next) => {
    const [scheme, token] = (req.get('authorization') || '').split(' ')
    if (scheme !== 'Bearer' || !token) {
        next(new AppError(401, 'Authentification requise'))
        return
    }

    let payload
    try {
        payload = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ['HS256'],
        })
    } catch {
        next(new AppError(401, 'Jeton invalide ou expiré'))
        return
    }

    if (
        typeof payload !== 'object' ||
        typeof payload.sub !== 'string' ||
        !mongoose.isValidObjectId(payload.sub)
    ) {
        next(new AppError(401, 'Jeton invalide ou expiré'))
        return
    }

    req.userId = payload.sub
    next()
}

export default requireAuth
