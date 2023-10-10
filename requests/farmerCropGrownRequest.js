import Joi from '@hapi/joi';

export default (requestData) => {
    const schema = Joi.object({
        farmercropgrowns: Joi.array().required().messages({
                'array.empty' : ` farmer Crop Grown  cannot be an empty field`,
                'any.required': ` farmer Crop Grown is a required field`
            }),
    });
    return schema.validate(requestData, {abortEarly: false});
}