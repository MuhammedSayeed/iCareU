import Joi from "joi";

const addCare = Joi.object({
    id: Joi.string().hex().length(24).required().messages({
        'any.required': 'patient is required.',
        'string.hex': 'patient must be a hexadecimal string.',
        'string.length': 'patient should be exactly 24 characters long.'
    }),
    mentor: Joi.string().hex().length(24).messages({
        'string.hex': 'mentor must be a hexadecimal string.',
        'string.length': 'mentor should be exactly 24 characters long.'
    }),
});

export{
    addCare
}