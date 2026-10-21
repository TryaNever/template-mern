import { Router } from 'express'
import mongoose from 'mongoose'
import { z } from 'zod'
import Example from '../models/Example.js'
import requireAuth from '../middlewares/requireAuth.js'
import validateBody from '../middlewares/validateBody.js'
import AppError from '../utils/AppError.js'
import asyncHandler from '../utils/asyncHandler.js'

const router = Router()
const createExampleSchema = z.object({
    name: z.string().trim().min(1).max(120),
    description: z.string().trim().max(2000).optional(),
    status: z.enum(['active', 'archived']).optional(),
})
const updateExampleSchema = createExampleSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: 'Au moins un champ doit être fourni',
    })

router.use('/examples', requireAuth)

router.get(
    '/examples',
    asyncHandler(async (req, res) => {
        const examples = await Example.find({ owner: req.userId })
            .sort({ createdAt: -1 })
            .limit(100)
        res.status(200).json({ success: true, data: examples })
    })
)

router.post(
    '/examples',
    validateBody(createExampleSchema),
    asyncHandler(async (req, res) => {
        const example = await Example.create({ ...req.body, owner: req.userId })
        res.status(201).json({ success: true, data: example })
    })
)

router.get(
    '/examples/:id',
    asyncHandler(async (req, res) => {
        if (!mongoose.isValidObjectId(req.params.id)) {
            throw new AppError(400, 'Identifiant invalide')
        }

        const example = await Example.findOne({ _id: req.params.id, owner: req.userId })
        if (!example) {
            throw new AppError(404, 'Ressource introuvable')
        }

        res.status(200).json({ success: true, data: example })
    })
)

router.patch(
    '/examples/:id',
    validateBody(updateExampleSchema),
    asyncHandler(async (req, res) => {
        if (!mongoose.isValidObjectId(req.params.id)) {
            throw new AppError(400, 'Identifiant invalide')
        }

        const example = await Example.findOneAndUpdate(
            { _id: req.params.id, owner: req.userId },
            { $set: req.body },
            { new: true, runValidators: true }
        )
        if (!example) {
            throw new AppError(404, 'Ressource introuvable')
        }

        res.status(200).json({ success: true, data: example })
    })
)

router.delete(
    '/examples/:id',
    asyncHandler(async (req, res) => {
        if (!mongoose.isValidObjectId(req.params.id)) {
            throw new AppError(400, 'Identifiant invalide')
        }

        const example = await Example.findOneAndDelete({
            _id: req.params.id,
            owner: req.userId,
        })
        if (!example) {
            throw new AppError(404, 'Ressource introuvable')
        }

        res.status(204).end()
    })
)

export default router
