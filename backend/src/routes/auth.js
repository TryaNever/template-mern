import { randomBytes, createHash } from 'node:crypto'
import { Router } from 'express'
import bcrypt from 'bcrypt'
import { rateLimit } from 'express-rate-limit'
import jwt from 'jsonwebtoken'
import { Resend } from 'resend'
import { z } from 'zod'
import requireAuth from '../middlewares/requireAuth.js'
import User from '../models/User.js'
import AppError from '../utils/AppError.js'
import asyncHandler from '../utils/asyncHandler.js'
import validateBody from '../middlewares/validateBody.js'

const router = Router()
const passwordSchema = z
    .string()
    .min(12, 'Le mot de passe doit contenir au moins 12 caractères')
    .max(72, 'Le mot de passe ne doit pas dépasser 72 caractères')
    .refine((password) => Buffer.byteLength(password, 'utf8') <= 72, {
        message: 'Le mot de passe ne doit pas dépasser 72 octets',
    })
const credentialsSchema = z.object({
    email: z
        .string()
        .trim()
        .email()
        .max(254)
        .transform((email) => email.toLowerCase()),
    password: passwordSchema,
})
const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email()
        .max(254)
        .transform((email) => email.toLowerCase()),
    password: z.string().min(1).max(72),
})
const forgotPasswordSchema = z.object({
    email: z
        .string()
        .trim()
        .email()
        .max(254)
        .transform((email) => email.toLowerCase()),
})
const resetPasswordSchema = z.object({
    token: z.string().min(32).max(256),
    password: passwordSchema,
})
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { success: false, message: 'Trop de tentatives, réessayez plus tard' },
})
const resetRequestLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { success: false, message: 'Trop de demandes, réessayez plus tard' },
})
const genericResetResponse = {
    success: true,
    message:
        'Si cette adresse est associée à un compte, un e-mail de réinitialisation sera envoyé.',
}
const dummyPasswordHash = User.hashPassword(randomBytes(32).toString('hex'))

const hashToken = (token) => createHash('sha256').update(token).digest('hex')

router.post(
    '/auth/register',
    authLimiter,
    validateBody(credentialsSchema),
    asyncHandler(async (req, res) => {
        const user = await User.create(req.body)
        res.status(201).json({
            success: true,
            user: { id: user.id, email: user.email },
        })
    })
)

router.get(
    '/auth/me',
    requireAuth,
    asyncHandler(async (req, res) => {
        const user = await User.findById(req.userId)
        if (!user) {
            throw new AppError(401, 'Compte introuvable')
        }

        res.status(200).json({
            success: true,
            user: { id: user.id, email: user.email },
        })
    })
)

router.post(
    '/auth/login',
    authLimiter,
    validateBody(loginSchema),
    asyncHandler(async (req, res) => {
        const user = await User.findOne({ email: req.body.email }).select('+password')
        const passwordHash = user ? user.password : await dummyPasswordHash
        const passwordMatches = await bcrypt.compare(req.body.password, passwordHash)

        if (!passwordMatches) {
            throw new AppError(401, 'Adresse e-mail ou mot de passe incorrect')
        }

        const token = jwt.sign({}, process.env.JWT_SECRET, {
            subject: user.id,
            expiresIn: process.env.JWT_EXPIRES_IN || '15m',
            algorithm: 'HS256',
        })

        res.status(200).json({
            success: true,
            token,
            tokenType: 'Bearer',
            expiresIn: process.env.JWT_EXPIRES_IN || '15m',
            user: { id: user.id, email: user.email },
        })
    })
)

router.post(
    '/auth/forgot-password',
    resetRequestLimiter,
    validateBody(forgotPasswordSchema),
    asyncHandler(async (req, res) => {
        const {
            RESEND_API_KEY: apiKey,
            EMAIL_FROM: sender,
            FRONTEND_URL: frontendUrl,
        } = process.env
        if (!apiKey || !sender || !frontendUrl) {
            throw new AppError(503, 'Le service de réinitialisation n’est pas configuré')
        }

        const ttlMinutes = Number(process.env.RESET_TOKEN_TTL_MINUTES || 30)
        if (!Number.isInteger(ttlMinutes) || ttlMinutes < 1 || ttlMinutes > 1440) {
            throw new Error('RESET_TOKEN_TTL_MINUTES doit être compris entre 1 et 1440')
        }
        const resetUrl = new URL('/reset-password', frontendUrl)

        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            res.status(202).json(genericResetResponse)
            return
        }

        const token = randomBytes(32).toString('base64url')

        user.resetTokenHash = hashToken(token)
        user.resetTokenExpiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000)
        await user.save()

        resetUrl.hash = new URLSearchParams({ token }).toString()

        try {
            const resend = new Resend(apiKey)
            const { error } = await resend.emails.send({
                from: sender,
                to: user.email,
                subject: 'Réinitialisation de votre mot de passe',
                html: `<p>Pour choisir un nouveau mot de passe, utilisez ce lien valable ${ttlMinutes} minutes :</p><p><a href="${resetUrl.toString()}">Réinitialiser mon mot de passe</a></p>`,
            })

            if (error) {
                throw new Error(`Échec d’envoi de l’e-mail : ${error.message}`)
            }
        } catch (error) {
            user.resetTokenHash = undefined
            user.resetTokenExpiresAt = undefined
            console.error('Échec de l’envoi de l’e-mail de réinitialisation :', error)
            try {
                await user.save()
            } catch (cleanupError) {
                console.error('Échec de suppression du jeton de réinitialisation :', cleanupError)
            }
        }

        res.status(202).json(genericResetResponse)
    })
)

router.post(
    '/auth/reset-password',
    authLimiter,
    validateBody(resetPasswordSchema),
    asyncHandler(async (req, res) => {
        const user = await User.findOne({
            resetTokenHash: hashToken(req.body.token),
            resetTokenExpiresAt: { $gt: new Date() },
        }).select('+resetTokenHash +resetTokenExpiresAt')

        if (!user) {
            throw new AppError(400, 'Jeton de réinitialisation invalide ou expiré')
        }

        const passwordHash = await User.hashPassword(req.body.password)
        const result = await User.updateOne(
            {
                _id: user._id,
                resetTokenHash: hashToken(req.body.token),
                resetTokenExpiresAt: { $gt: new Date() },
            },
            {
                $set: { password: passwordHash },
                $unset: { resetTokenHash: 1, resetTokenExpiresAt: 1 },
            }
        )

        if (result.modifiedCount !== 1) {
            throw new AppError(400, 'Jeton de réinitialisation invalide ou expiré')
        }

        res.status(200).json({ success: true, message: 'Mot de passe réinitialisé' })
    })
)

export default router
