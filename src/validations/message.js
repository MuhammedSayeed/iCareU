import Joi from "joi";

const messageSchema = Joi.object({
    id: Joi.string().hex().length(24).required().messages({
        'any.required': 'chat id is required.',
        'string.hex': 'chat id  must be a hexadecimal string.'
    }),
    content: Joi.string().min(1).max(500).required().messages({
        'any.required': 'content of message is required.',
        'string.base': 'content of message must be a string.'
    })
});

export{
    messageSchema
}