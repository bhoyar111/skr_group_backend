import Joi from '@hapi/joi';

export default (requestData, id = 0) => {
    const schema = Joi.object({
        address: Joi.string().required().messages({
            'string.empty': ` address cannot be an empty field`,
            'any.required': ` address is a required field`
        }),
        krushi_kendra_name: Joi.string().required().messages({
            'string.empty': ` krushi_kendra_name cannot be an empty field`,
            'any.required': ` krushi_kendra_name is a required field`
        }),
        irrigate: Joi.string().required().messages({
            'string.empty': ` irrigate cannot be an empty field`,
            'any.required': ` irrigate is a required field`
        }),
        acreage: Joi.string().required().messages({
            'string.empty': ` acreage cannot be an empty field`,
            'any.required': ` acreage is a required field`
        }),
    });
    return schema.validate(requestData, {abortEarly: false});
}