import Joi from "joi";
const signUpSchema = Joi.object({
    name: Joi.string().min(2).max(25).required().messages({
        'string.min': 'Name must be at least {#limit} characters long.',
        'string.max': 'Name cannot be longer than {#limit} characters.',
        'any.required': 'Name is required.'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email format. Please enter a valid email address.',
        'any.required': 'Email is required.'
    }),

    password: Joi.string().min(6).max(32)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .required().messages({
            'string.min': 'Password must be at least {#limit} characters long.',
            'string.max': 'Password cannot be longer than {#limit} characters.',
            'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, and one digit.',
            'any.required': 'Password is required.'
        }),
    repassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match.',
        'any.required': 'repassword is required.'
    }),
    role: Joi.string().valid('patient', 'mentor', 'admin').required().messages({
        'any.only': 'Role must be either "patient" or "mentor".',
        'any.required': 'Role is required.'
    })
});
const signInSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email format. Please enter a valid email address.',
        'any.required': 'Email is required.'
    }),
    password: Joi.string().min(6).max(32).required().messages({
        'any.required': 'Password is required.'
    })
});
const confirmResetPasswordSchema = Joi.object({
    password: Joi.string().min(6).max(32)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .required().messages({
            'string.min': 'Password must be at least {#limit} characters long.',
            'string.max': 'Password cannot be longer than {#limit} characters.',
            'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, and one digit.',
            'any.required': 'Password is required.'
        }),
    repassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match.',
        'any.required': 'repassword is required.'
    }),
});
const updateUserSchema = Joi.object({
    name: Joi.string().min(2).max(25).required().messages({
        'string.min': 'Name must be at least {#limit} characters long.',
        'string.max': 'Name cannot be longer than {#limit} characters.',
        'any.required': 'Name is required.'
    }),
    gender: Joi.string().required().valid('male', 'female').messages({
        'any.required': 'gender is required.'
    })
});
const updatePasswordSchema = Joi.object({
    password: Joi.string().min(6).max(32).required().messages({
        'any.required': 'Old password is required.'
    }),
    newPassword: Joi.string().min(6).max(32)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .required().messages({
            'string.min': 'Password must be at least {#limit} characters long.',
            'string.max': 'Password cannot be longer than {#limit} characters.',
            'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, and one digit.',
            'any.required': 'Password is required.'
        }),
});
const emailSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email format. Please enter a valid email address.',
        'any.required': 'Email is required.'
    }),
});
const verifyResetPasswordCodeSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email format. Please enter a valid email address.',
        'any.required': 'Email is required.'
    }),
    code: Joi.number().integer().min(100000).max(999999).required().messages({
        'number.base': `"code" should be a number`,
        'any.required': `"code" is required.`,
        'number.length': `"code" must be exactly 6 characters long.`,
    }),
});
const codeSchema = Joi.object({
    code: Joi.number().integer().min(100000).max(999999).required().messages({
        'number.base': `"code" should be a number`,
        'any.required': `"code" is required.`,
        'number.length': `"code" must be exactly 6 characters long.`,
    }),
})


export{
    signInSchema,
    signUpSchema,
    confirmResetPasswordSchema,
    updatePasswordSchema,
    updateUserSchema,
    emailSchema,
    verifyResetPasswordCodeSchema,
    codeSchema
    

}