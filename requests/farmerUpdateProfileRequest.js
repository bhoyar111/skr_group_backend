import Joi from '@hapi/joi';

export default (requestData, id = 0) => {
    const schema = Joi.object({
        full_name: Joi.string().required().messages({
            'string.base' : `full name should be a type of 'text'`,
            'string.empty': `full name cannot be an empty field`,
            'any.required': `full name is a required field`
        }),
        age: Joi.string().allow('').required().messages({
            'string.base' : `age should be a type of 'text'`,
            'string.empty': `age cannot be an empty field`,
            'any.required': `age is a required field`
        }),
        email_id: Joi.string().email().allow('').required().messages({
            'string.base' : `email should be a type of 'text'`,
            'string.email': `email should be a type of 'email'`,
            'string.empty': `email cannot be an empty field`,
            'any.required': `email is a required field`
        }),
        mobile_no: Joi.string().required().messages({
            'string.base' : `mobile no should be a type of 'text'`,
            'string.empty': `mobile no cannot be an empty field`,
            'any.required': `mobile no is a required field`
        }),
        address: Joi.string().allow('').required().messages({
            'string.base' : `address should be a type of 'text'`,
            'string.empty': `address cannot be an empty field`,
            'any.required': `address is a required field`
        }),
        state_id: Joi.number().min(1).allow('').required().messages({
            'number.base' : `state_id should be a type of 'number'`,
            'number.empty': `state_id cannot be an empty field`,
            'number.min'  : `state_id length must be at least 1 characters`,
            'any.required': `state_id is a required field`
        }),
        district_id: Joi.number().min(1).allow('').required().messages({
            'number.base' : `district_id should be a type of 'number'`,
            'number.empty': `district_id cannot be an empty field`,
            'number.min'  : `district_id length must be at least 1 characters`,
            'any.required': `district_id is a required field`
        }),
        taluka: Joi.string().allow('').required().messages({
            'string.base' : `taluka should be a type of 'text'`,
            'string.empty': `taluka cannot be an empty field`,
            'any.required': `taluka is a required field`
        }),
        pin_code: Joi.string().allow('').required().messages({
            'string.base' : `pin_code should be a type of 'text'`,
            'string.empty': `pin_code cannot be an empty field`,
            'any.required': `pin_code is a required field`
        }),
        irrigate: Joi.string().allow('').required().messages({
            'string.empty': ` irrigate cannot be an empty field`,
            'any.required': ` irrigate is a required field`
        }),
        acreage: Joi.string().allow('').required().messages({
            'string.empty': ` acreage cannot be an empty field`,
            'any.required': ` acreage is a required field`
        }),
        krushi_kendra_name: Joi.string().allow('').required().messages({
            'string.base' : `krushi_kendra_name should be a type of 'text'`,
            'string.empty': `krushi_kendra_name cannot be an empty field`,
            'any.required': `krushi_kendra_name is a required field`
        }),
        farmercropgrowns: Joi.array().required().messages({
            'array.empty' : `Crop Grown cannot be an empty field`,
            'any.required': `Crop Grown is a required field`
        }),
    });
    return schema.validate(requestData, {abortEarly: false});
}