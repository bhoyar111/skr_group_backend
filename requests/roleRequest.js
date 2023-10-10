import Joi from '@hapi/joi';

export default (requestData) => {
    const schema = Joi.object({
        role_name: Joi.string().required().messages({
            'string.base': `role name should be a type of 'text'`,
            'string.empty': `role name cannot be an empty field`,
            'any.required': `role name is a required field`
        }),
        description: Joi.string().allow('').messages({
            'string.base': `role description should be a type of 'text'`
        }),
        // permission: Joi.array().allow('').messages({
        //     'array.base': `role permission should be a type of 'array'`
        // }),
        permission: Joi.string().allow('').messages({
            'string.base': `role permission should be a type of 'text'`
        })
    });
    return schema.validate(requestData, {abortEarly: false});
}