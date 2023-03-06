import Joi from 'joi'

export const rateSchema = Joi.object({
    rate: Joi.number().required(),
    comment: Joi.string()
})
export default interface rateDTO {
    rate: Number,
    comment: string,
    created_at: Date,

    id_manager: string

}
