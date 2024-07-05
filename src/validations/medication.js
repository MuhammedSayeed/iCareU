import Joi from "joi";

const addMedicationSchema = Joi.object({
    patient: Joi.string().hex().length(24).required().messages({
        'any.required': 'patient is required.',
        'string.hex': 'patient must be a hexadecimal string.',
        'string.length': 'patient should be exactly 24 characters long.'
    }),
    name: Joi.string().required().messages({
        'any.required': 'Name of medication is required.',
        'string.base': 'Name of medication must be a string.'
    }),
    shape: Joi.string().valid('drink', 'pill', 'rivet', 'Injection').default('drink').messages({
        'any.only': 'Shape must be one of: drink, pill, rivet, Injection.'
    }),
    dosage: Joi.number().integer().required().messages({
        'any.required': 'Dosage is required.',
        'string.base': 'Dosage must be a string.'
    }),
    repeatFor: Joi.number().integer().min(0).max(167).required().messages({
        'number.base': `"RepeatFor" should be a number`,
        'any.required': `"RepeatFor" is required.`
    }),
    afterMeal: Joi.boolean(),
    beforeMeal: Joi.boolean(),
    time: Joi.object({
        hour: Joi.number().min(0).max(23).messages({
            'number.base': 'Hour must be a number.',
            'number.min': 'Hour must be greater than or equal to 0.',
            'number.max': 'Hour must be less than or equal to 23.'
        }),
        minutes: Joi.number().min(0).max(59).messages({
            'number.base': 'Minutes must be a number.',
            'number.min': 'Minutes must be greater than or equal to 0.',
            'number.max': 'Minutes must be less than or equal to 59.'
        }),
        system: Joi.string().valid("PM", "AM").required().messages({
            'any.required': 'The time period is required.',
            'any.only': 'The time period must be either "AM" or "PM".',
            'string.base': 'The time period must be a string.'
        })
    }).default({
        hour: 0,
        minutes: 0
    })

});
const updateMedicationSchema = Joi.object({
    id: Joi.string().hex().length(24).required().messages({
        'any.required': 'Medication id is required.'

    }),
    patient: Joi.string().hex().length(24).required().messages({
        'any.required': 'patient is required.',
        'string.hex': 'patient must be a hexadecimal string.',
        'string.length': 'patient should be exactly 24 characters long.'
    }),
    mentor: Joi.string().hex().length(24).messages({
        'string.hex': 'mentor must be a hexadecimal string.',
        'string.length': 'mentor should be exactly 24 characters long.'
    }),
    name: Joi.string().required().messages({
        'any.required': 'Name of medication is required.',
        'string.base': 'Name of medication must be a string.'
    }),
    shape: Joi.string().valid('drink', 'pill', 'rivet', 'Injection').default('drink').messages({
        'any.only': 'Shape must be one of: drink, pill, rivet, Injection.'
    }),
    dosage: Joi.number().integer().required().messages({
        'any.required': 'Dosage is required.',
        'string.base': 'Dosage must be a string.'
    }),
    repeatFor: Joi.number().integer().min(0).max(167).required().messages({
        'number.base': `"RepeatFor" should be a number`,
        'any.required': `"RepeatFor" is required.`
    }),
    afterMeal: Joi.boolean(),
    beforeMeal: Joi.boolean(),
    time: Joi.object({
        hour: Joi.number().min(0).max(23).messages({
            'number.base': 'Hour must be a number.',
            'number.min': 'Hour must be greater than or equal to 0.',
            'number.max': 'Hour must be less than or equal to 23.'
        }),
        minutes: Joi.number().min(0).max(59).messages({
            'number.base': 'Minutes must be a number.',
            'number.min': 'Minutes must be greater than or equal to 0.',
            'number.max': 'Minutes must be less than or equal to 59.'
        }),
        system: Joi.string().valid("PM", "AM").required().messages({
            'any.required': 'The time period is required.',
            'any.only': 'The time period must be either "AM" or "PM".',
            'string.base': 'The time period must be a string.'
        })
    }).default({
        hour: 0,
        minutes: 0
    })
});
const medicationSchema = Joi.object({
    id: Joi.string().hex().length(24).required().messages({
        'any.required': 'id is required.'
    }),
});

export {
    addMedicationSchema,
    updateMedicationSchema,
    medicationSchema
}