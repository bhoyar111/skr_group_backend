import Joi from '@hapi/joi';

export default (requestData) => {
    const schema = Joi.object({
        name: Joi.string().required().messages({
            'string.base' : `Name should be a type of 'text'`,
            'string.empty': `Name cannot be an empty field`,
            'any.required': `Name is a required field`
        }),
    
    });
    return schema.validate(requestData, {abortEarly: false});
}