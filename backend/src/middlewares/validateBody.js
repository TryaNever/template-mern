import AppError from '../utils/AppError.js'

const validateBody = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
        const message = result.error.issues
            .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
            .join(', ')
        next(new AppError(400, message))
        return
    }

    req.body = result.data
    next()
}

export default validateBody
