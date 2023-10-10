import Joi from '@hapi/joi';

export default (requestData) => {
    const schema = Joi.object({
        language_id: Joi.number().min(1).required().messages({
            'number.base' : `language_id should be a type of 'number'`,
            'number.empty': `language_id cannot be an empty field`,
            'number.min'  : `language_id length must be at least 1 characters`,
            'any.required': `language_id is a required field`
        }),
        heading: Joi.string().required().messages({ 
            'string.base' : `heading should be a type of 'text'`,
            'string.empty': `heading cannot be an empty field`,
            'any.required': `heading is a required field`
        }),
        heading_des: Joi.string().required().messages({ 
            'string.base' : `heading_des should be a type of 'text'`,
            'string.empty': `heading_des cannot be an empty field`,
            'any.required': `heading_des is a required field`
        }),
    });
    return schema.validate(requestData, {abortEarly: false});
}