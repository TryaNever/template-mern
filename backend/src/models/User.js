import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

const SALT_ROUNDS = 12

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            maxlength: 254,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        resetTokenHash: {
            type: String,
            select: false,
        },
        resetTokenExpiresAt: {
            type: Date,
            select: false,
        },
    },
    { timestamps: true }
)

userSchema.pre('save', async function hashPassword() {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
    }
})

userSchema.methods.comparePassword = function comparePassword(password) {
    return bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = (password) => bcrypt.hash(password, SALT_ROUNDS)

const User = mongoose.model('User', userSchema)

export default User
