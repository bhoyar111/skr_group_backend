import Joi from '@hapi/joi';

export default (requestData) => {
    const schema = Joi.object({
        mobile_no: Joi.string().required().messages({ 
            'string.base' : `mobile_no should be a type of 'text'`,
            'string.empty': `mobile_no cannot be an empty field`,
            'any.required': `mobile_no is a required field`
        }),
        otp: Joi.string().required().messages({
            'string.base' : `otp should be a type of 'text'`,
            'string.empty': `otp cannot be an empty field`,
            'any.required': `otp is a required field`
        })
    });
    return schema.validate(requestData, {abortEarly: false});
}