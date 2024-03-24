import Joi from "joi";

const idSchema = Joi.object({
    id: Joi.string().hex().length(24).required().messages({
        'any.required': 'id is required.'
    }),
    patient: Joi.string().hex()
});

export {
    idSchema
}