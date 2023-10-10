import Joi from '@hapi/joi';

export default (requestData) => {
    const schema = Joi.object({
       
        current_password: Joi.string().required().min(8).messages({ //.min(8)
            'string.base' : `Current Password should be a type of 'text'`,
            'string.min'  : `Current Password length must be at least 8 characters`,
            'string.empty': `Current Password cannot be an empty field`,
            'any.required': `Current Password is a required field`
        }), 
        password: Joi.string().required().min(8).messages({ //.min(8)
            'string.base' : `New Password should be a type of 'text'`,
            'string.min'  : `New Password length must be at least 8 characters`,
            'string.empty': `New Password cannot be an empty field`,
            'any.required': `New Password is a required field`
        }),
        confirm_password: Joi.string().required().min(8).messages({ //.min(8)
            'string.base' : `Confirm password should be a type of 'text'`,
            'string.min'  : `Confirm password length must be at least 8 characters`,
            'string.empty': `Confirm password cannot be an empty field`,
            'any.required': `Confirm password is a required field`
        }),
    });
    return schema.validate(requestData, { abortEarly: false });
}