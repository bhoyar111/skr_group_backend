import Joi from '@hapi/joi';

export default (requestData) => {
    const schema = Joi.object({
        product_category_id: Joi.number().min(1).required().messages({
            'number.base' : `Product Category should be a type of 'number'`,
            'number.empty': `Product Category cannot be an empty field`,
            'number.min'  : `Product Category length must be at least 1 characters`,
            'any.required': `Product Category is a required field`
        }),
        product_name: Joi.string().required().messages({
            'string.base' : `product_name should be a type of 'text'`,
            'string.empty': `product_name cannot be an empty field`,
            'any.required': `product_name is a required field`
        }),
        price: Joi.string().required().messages({
            'string.base' : `Price should be a type of 'text'`,
            'string.empty': `Price cannot be an empty field`,
            'any.required': `Price is a required field`
        }),
        weight: Joi.string().required().messages({
            'string.base' : `Weight should be a type of 'text'`,
            'string.empty': `Weight cannot be an empty field`,
            'any.required': `Weight is a required field`
        }),
        description: Joi.string().allow('').required().messages({
            'string.base' : `Description should be a type of 'text'`,
            'string.empty': `Description cannot be an empty field`,
            'any.required': `Description is a required field`
        }),
        doc_url: Joi.string().allow('').messages({
            'string.base' : `doc_url should be a type of 'file'`,
            'string.empty': `doc_url cannot be an empty field`,
            'any.required': `doc_url is a required field`
        }),
    
    });
    return schema.validate(requestData, {abortEarly: false});
}