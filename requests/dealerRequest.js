import Joi, { allow } from '@hapi/joi';

export default (requestData, id = 0) => {
    const schema = Joi.object({
        dealer_name: Joi.string().required().messages({
            'string.base' : `dealer_name should be a type of 'text'`,
            'string.empty': `dealer_name cannot be an empty field`,
            'any.required': `dealer_name is a required field`
        }),
        email_id: Joi.string().email().allow('').required().messages({
            'string.base' : `email should be a type of 'text'`,
            'string.email': `email should be a type of 'email'`,
            'string.empty': `email cannot be an empty field`,
            'any.required': `email is a required field`
        }),
        mobile_no: Joi.string().required().messages({ 
            'string.base' : `mobile_no should be a type of 'text'`,
            'string.empty': `mobile_no cannot be an empty field`,
            'any.required': `mobile_no is a required field`
        }),
        dealer_address: Joi.string().required().messages({
            'string.base' : `dealer_name should be a type of 'text'`,
            'string.empty': `dealer_name cannot be an empty field`,
            'any.required': `dealer_name is a required field`
        }),
        country_id: Joi.number().min(1).required().messages({
            'number.base' : `country_id should be a type of 'number'`,
            'number.empty': `country_id cannot be an empty field`,
            'number.min'  : `country_id length must be at least 1 characters`,
            'any.required': `country_id is a required field`
        }),
        state_id: Joi.number().min(1).required().messages({
            'number.base' : `state_id should be a type of 'number'`,
            'number.empty': `state_id cannot be an empty field`,
            'number.min'  : `state_id length must be at least 1 characters`,
            'any.required': `state_id is a required field`
        }),
        district_id: Joi.number().min(1).required().messages({
            'number.base' : `district_id should be a type of 'number'`,
            'number.empty': `district_id cannot be an empty field`,
            'number.min'  : `district_id length must be at least 1 characters`,
            'any.required': `district_id is a required field`
        }),
        taluka: Joi.string().required().messages({
            'string.base' : `taluka should be a type of 'text'`,
            'string.empty': `taluka cannot be an empty field`,
            'any.required': `taluka is a required field`
        }),
        pin_code: Joi.string().required().messages({
            'string.base' : `pin_code should be a type of 'text'`,
            'string.empty': `pin_code cannot be an empty field`,
            'any.required': `pin_code is a required field`
        }),
        doc_url: Joi.string().allow('').messages({ 
            'string.base' : `doc_url should be a type of 'text'`,
            'string.empty': `doc_url cannot be an empty field`,
            'any.required': `doc_url is a required field`
        }),
        google_place: Joi.any().allow('').required().messages({
            'any.required': `google_place is a required field`
        }),
        latitude: Joi.any().required().allow('').messages({
            'any.required': `latitude is a required field`
        }),
        longitude: Joi.any().allow('').required().messages({
            'any.required': `longitude is a required field`
        }),
        password: (!id) ? Joi.string().allow('').required().min(8).messages({
            'string.base' : `password should be a type of 'text'`,
            'string.min'  : `password length must be at least 8 characters`,
            'string.empty': `password cannot be an empty field`,
            'any.required': `password is a required field`
        }) :
        Joi.string().allow('').min(8).messages({
            'string.base' : `password should be a type of 'text'`,
            'string.base' : `password should be a type of 'text'`,
            'string.min'  : `password length must be at least 8 characters`
        }),
    });
    return schema.validate(requestData, {abortEarly: false});
}