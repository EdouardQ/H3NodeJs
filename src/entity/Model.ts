import joi from 'joi'
import mongoose from 'mongoose'

export const CreateModelSchema = joi.object({
    name: joi.string().required(),
    artistFullname: joi.string().required(),
    valid: joi.boolean().required(),
    approval: joi.number().required(),
    disapproval: joi.number().required()
}).required()

export const UpdateModelSchema = joi.object({
    name: joi.string().required(),
    artistFullname: joi.string().required(),
    valid: joi.boolean().required(),
    approval: joi.number().required(),
    disapproval: joi.number().required()
}).required()


const modelSchema = new mongoose.Schema({
    id: Number,
    name: String,
    artistFullname: String,
    valid: Boolean,
    approval: Number,
    disapproval: Number
})

export const Model = mongoose.model('Model', modelSchema)
