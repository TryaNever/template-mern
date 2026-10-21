import mongoose from 'mongoose'

const exampleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 120,
        },
        description: {
            type: String,
            trim: true,
            maxlength: 2000,
            default: '',
        },
        status: {
            type: String,
            enum: ['active', 'archived'],
            default: 'active',
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
    },
    { timestamps: true }
)

const Example = mongoose.model('Example', exampleSchema)

export default Example
