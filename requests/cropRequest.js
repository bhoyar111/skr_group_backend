import Joi from '@hapi/joi';

export default (requestData) => {
    const schema = Joi.object({
        crop_name: Joi.string().required().messages({
            'string.base' : `crop_name should be a type of 'text'`,
            'string.empty': `crop_name cannot be an empty field`,
            'any.required': `crop_name is a required field`
        }),
        crop_img: Joi.string().allow('').messages({
            'string.base' : `crop_img should be a type of 'file'`,
            'string.empty': `crop_img cannot be an empty field`,
            'any.required': `crop_img is a required field`
        })
       
    });
    return schema.validate(requestData, {abortEarly: false});
}