import Joi from '@hapi/joi';

export default (requestData) => {
    const schema = Joi.object({
        sub_crop_name: Joi.string().required().messages({
            'string.base' : `sub_crop_name should be a type of 'text'`,
            'string.empty': `sub_crop_name cannot be an empty field`,
            'any.required': `sub_crop_name is a required field`
        }),
        crop_id: Joi.number().min(1).required().messages({
            'number.base' : `crop_id should be a type of 'number'`,
            'number.empty': `crop_id cannot be an empty field`,
            'number.min'  : `crop_id length must be at least 1 characters`,
            'any.required': `crop_id is a required field`
        }),
        sub_crop_img: Joi.string().allow('').messages({
            'string.base' : `sub_crop_img should be a type of 'text'`,
            'string.empty': `sub_crop_img cannot be an empty field`,
            'any.required': `sub_crop_img is a required field`
        })
       
    });
    return schema.validate(requestData, {abortEarly: false});
}