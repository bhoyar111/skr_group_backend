import Joi from '@hapi/joi';

export default (requestData) => {
    const schema = Joi.object({
        language_name: Joi.string().required().messages({ 
            'string.base' : `language_name should be a type of 'text'`,
            'string.empty': `language_name cannot be an empty field`,
            'any.required': `language_name is a required field`
        }),
    });
    return schema.validate(requestData, {abortEarly: false});
}