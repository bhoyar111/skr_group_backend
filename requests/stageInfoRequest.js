import Joi from '@hapi/joi';

export default (requestData) => {
    const schema = Joi.object({
        name: Joi.string().required().messages({
            'string.base' : `name should be a type of 'file'`,
            'string.empty': `name cannot be an empty field`,
            'any.required': `name is a required field`
        }),
        sub_crop_id: Joi.number().allow('').required().messages({
            'number.base' : `sub_crop_id should be a type of 'number'`,
            'number.empty': `sub_crop_id cannot be an empty field`,
            'number.min'  : `sub_crop_id length must be at least 1 characters`,
            'any.required': `sub_crop_id is a required field`
        }),
        stage_id: Joi.number().min(1).required().messages({
            'number.base' : `stage_id should be a type of 'number'`,
            'number.empty': `stage_id cannot be an empty field`,
            'number.min'  : `stage_id length must be at least 1 characters`,
            'any.required': `stage_id is a required field`
        }),
        description: Joi.string().allow('').messages({
            'string.base' : `description should be a type of 'text'`,
            'string.empty': `description cannot be an empty field`,
            'any.required': `description is a required field`
        }),
        doc_url: Joi.string().allow('').messages({
            'string.base' : `doc_url should be a type of 'file'`,
            'string.empty': `doc_url cannot be an empty field`,
            'any.required': `doc_url is a required field`
        }),
    });
    return schema.validate(requestData, {abortEarly: false});
}