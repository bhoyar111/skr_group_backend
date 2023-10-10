import Joi from '@hapi/joi';

export default (requestData) => {
    const schema = Joi.object({
        banner_img: Joi.string().allow('').messages({
            'string.base' : `banner_img should be a type of 'file'`,
            'string.empty': `banner_img cannot be an empty field`,
            'any.required': `banner_img is a required field`
        })
       
    });
    return schema.validate(requestData, {abortEarly: false});
}