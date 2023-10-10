import Joi from '@hapi/joi';

export default (requestData) => {
    const schema = Joi.object({
        community_name: Joi.string().required().messages({ 
            'string.base' : `community_name should be a type of 'text'`,
            'string.empty': `community_name cannot be an empty field`,
            'any.required': `community_name is a required field`
        }),
        crop_id: Joi.number().min(1).required().messages({
            'number.base' : `crop_id should be a type of 'number'`,
            'number.empty': `crop_id cannot be an empty field`,
            'number.min'  : `crop_id length must be at least 1 characters`,
            'any.required': `crop_id is a required field`
        }),
        heading: Joi.string().required().messages({ 
            'string.base' : `heading should be a type of 'text'`,
            'string.empty': `heading cannot be an empty field`,
            'any.required': `heading is a required field`
        }),
        sub_heading: Joi.string().required().messages({ 
            'string.base' : `sub_heading should be a type of 'text'`,
            'string.empty': `sub_heading cannot be an empty field`,
            'any.required': `sub_heading is a required field`
        }),
        description: Joi.string().required().messages({ 
            'string.base' : `description should be a type of 'text'`,
            'string.empty': `description cannot be an empty field`,
            'any.required': `description is a required field`
        }),
        doc_url: Joi.string().allow('').required().messages({ 
            'string.base' : `doc_url should be a type of 'text'`,
            'string.empty': `doc_url cannot be an empty field`,
            'any.required': `doc_url is a required field`
        }),
    });
    return schema.validate(requestData, {abortEarly: false});
}