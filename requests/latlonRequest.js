import Joi from '@hapi/joi';

export default (requestData) => {
    const schema = Joi.object({
        lat: Joi.any().required().messages({
            'any.required': `lat is a required field`
        }),
        lon: Joi.any().required().messages({
            'any.required': `lon is a required field`
        })
    });
    return schema.validate(requestData, {abortEarly: false});
}