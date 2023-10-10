import Joi, { allow } from '@hapi/joi';

export default (requestData) => {
    const schema = Joi.object({
        farmer_id: Joi.number().min(1).allow('').messages({
            'number.base' : `farmer_id should be a type of 'number'`,
            'number.empty': `farmer_id cannot be an empty field`,
            'number.min'  : `farmer_id length must be at least 1 characters`,
            'any.required': `farmer_id is a required field`
        }),
        subject: Joi.string().required().messages({
            'string.base' : `subject should be a type of 'text'`,
            'string.empty': `subject cannot be an empty field`,
            'any.required': `subject is a required field`
        }),
        ask_date: Joi.string().required().allow('').messages({
            'string.base' : `ask_date should be a type of 'date'`,
            'string.empty': `ask_date cannot be an empty field`,
            'any.required': `ask_date is a required field`
        }),
        description: Joi.string().allow('').messages({
            'string.base' : `description should be a type of 'text'`,
            'string.empty': `description cannot be an empty field`,
            'any.required': `description is a required field`
        }),
        doc_url: Joi.string().allow('').messages({
            'string.base' : `doc_url should be a type of 'file'`,
            'string.empty': `doc_url cannot be an empty field`,
            'any.required': `doc_url is a required field`
        }),
    });
    return schema.validate(requestData, {abortEarly: false});
}