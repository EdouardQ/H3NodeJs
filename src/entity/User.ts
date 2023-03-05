import joi from 'joi'
import mongoose from 'mongoose'

export const CreateUserSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    role: joi.string().required()
}).required()

export const UpdateUserSchema = joi.object({
    name: joi.string().optional(),
    email: joi.string().email().optional(),
    password: joi.string().optional()
}).required()

export const userSerialized = (user: any) => {
    const { password, ...userWithoutPassword } = user
    const { __v, ...userSerialized } = userWithoutPassword

    return userSerialized
}

const userSchema = new mongoose.Schema({
    id: Number,
    name: {
        type: String
    },
    email: String,
    password: {
        type: Object
    },
    role: String,
    created_at: Date,
    updated_at: Date
})

export const User = mongoose.model('User', userSchema)
