import joi from 'joi'
import mongoose from 'mongoose'

export const CreateModelSchema = joi.object({
    name: joi.string().required(),
    url: joi.string().required(),
}).required()

export const UpdateModelSchema = joi.object({
    name: joi.string().required(),
    artistId: joi.string().required(),
    url: joi.string().required(),
    valid: joi.boolean().required(),
    approval: joi.number().required(),
    disapproval: joi.number().required(),
    uploaded_at: joi.date().required()
}).required()

const modelSchema = new mongoose.Schema({
    id: Number,
    name: String,
    artistId: String,
    url: String,
    valid: Boolean,
    approval: Number,
    disapproval: Number,
    uploaded_at: Date,
    updated_at: Date
})

export const Model = mongoose.model('Model', modelSchema)
