import joi from 'joi'
import mongoose from 'mongoose'

export const CreateModelSchema = joi.object({
    name: joi.string().required(),
    url: joi.string().required(),
}).required()

export const UpdateValidModelSchema = joi.object({
    valid: joi.boolean().required()
}).required()

export const UpdateVotesModelSchema = joi.object({
    approval: joi.number().required(),
    disapproval: joi.number().required()
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
