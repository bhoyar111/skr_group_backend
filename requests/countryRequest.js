import Joi from '@hapi/joi';

export default (requestData) => {
    const schema = Joi.object({
        country_name: Joi.string().required().messages({
            'string.base' : `country name should be a type of 'text'`,
            'string.empty': `country name cannot be an empty field`,
            'any.required': `country name is a required field`
        })
    });
    return schema.validate(requestData, {abortEarly: false});
}