import Joi from '@hapi/joi';

export default (requestData) => {
    const schema = Joi.object({
        full_name: Joi.string().required().messages({
            'string.base' : `full name should be a type of 'text'`,
            'string.empty': `full name cannot be an empty field`,
            'any.required': `full name is a required field`
        }),
        mobile_no: Joi.string().required().messages({ 
            'string.base' : `mobile_no should be a type of 'text'`,
            'string.empty': `mobile_no cannot be an empty field`,
            'any.required': `mobile_no is a required field`
        }),
    });
    return schema.validate(requestData, {abortEarly: false});
}