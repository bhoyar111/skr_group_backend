import Joi from '@hapi/joi';

export default (requestData) => {
    const schema = Joi.object({
        state_name: Joi.string().required().messages({
            'string.base' : `state name should be a type of 'text'`,
            'string.empty': `state name cannot be an empty field`,
            'any.required': `state name is a required field`
        }),
        country_id: Joi.number().min(1).required().messages({
            'number.base' : `country_id should be a type of 'number'`,
            'number.empty': `country_id cannot be an empty field`,
            'number.min'  : `country_id length must be at least 1 characters`,
            'any.required': `country_id is a required field`
        }),
       
    });
    return schema.validate(requestData, {abortEarly: false});
}