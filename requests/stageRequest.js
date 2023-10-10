import Joi from '@hapi/joi';

export default (requestData) => {
    const schema = Joi.object({
        stage_name: Joi.string().required().messages({
            'string.base' : `stage_name should be a type of 'text'`,
            'string.empty': `stage_name cannot be an empty field`,
            'any.required': `stage_name is a required field`
        }),
        sub_crop_id: Joi.number().allow('').required().messages({
            'number.base' : `sub_crop_id should be a type of 'number'`,
            'number.empty': `sub_crop_id cannot be an empty field`,
            'number.min'  : `sub_crop_id length must be at least 1 characters`,
            'any.required': `sub_crop_id is a required field`
        }),
        doc_url: Joi.string().allow('').messages({
            'string.base' : `doc_url should be a type of 'file'`,
            'string.empty': `doc_url cannot be an empty field`,
            'any.required': `doc_url is a required field`
        }),
        have_sub_stage: Joi.string().allow('').messages({
            'any.required': `having_sub_stage is a required field`
        }),
        description: Joi.string().allow('').messages({
            'string.base' : `description should be a type of 'text'`,
            'string.empty': `description cannot be an empty field`,
            'any.required': `description is a required field`
        }),
       
    });
    return schema.validate(requestData, {abortEarly: false});
}