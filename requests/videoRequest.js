import Joi from '@hapi/joi';

export default (requestData) => {
    const schema = Joi.object({
        title: Joi.string().required().messages({
            'string.base' : `title should be a type of 'text'`,
            'string.empty': `title cannot be an empty field`,
            'any.required': `title is a required field`
        }),
        sub_crop_id: Joi.number().min(1).required().messages({
            'number.base' : `sub_crop_id should be a type of 'number'`,
            'number.empty': `sub_crop_id cannot be an empty field`,
            'number.min'  : `sub_crop_id length must be at least 1 characters`,
            'any.required': `sub_crop_id is a required field`
        }),
        link: Joi.string().required().messages({
            'string.base' : `link should be a type of 'text'`,
            'string.empty': `link cannot be an empty field`,
            'any.required': `link is a required field`
        }),
        v_date: Joi.string().required().messages({
            'string.base' : `v_date should be a type of 'date'`,
            'string.empty': `v_date cannot be an empty field`,
            'any.required': `v_date is a required field`
        }),
    });
    return schema.validate(requestData, {abortEarly: false});
}