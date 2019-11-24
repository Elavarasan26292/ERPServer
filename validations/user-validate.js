const Joi = require('joi');
const Validate = (req, res, next) => {
    const schema = Joi.object().keys({
        firstName: Joi.string().required().label('First Name'),
        emailId: Joi.string().email().allow("").label('Email id'),
        phoneNo: Joi.string().allow("").regex(/^\d+$/).options({
            language: {
                string: {
                    regex: {
                        base: 'is invalid'
                    }
                }
            }
        }).label('Phone number'),
        password: Joi.string().required().regex(/^[a-zA-Z0-9!@#$%^&*()]{8,30}$/).options({
            language: {
                string: {
                    regex: {
                        base: 'is invalid'
                    }
                }
            }
        }).label('password'),
        address1: Joi.string().required().label('Address 1'),
        address2: Joi.string().required().label('Address 2'),
        country: Joi.string().required().label('Country'),
        state: Joi.string().required().label('State'),
        city: Joi.string().required().label('City'),
        zipCode: Joi.string().required().label('Zip Code'),
    });

    const error = Joi.validate(req.body, schema, { abortEarly: false });

    if (error && error.error !== null) {
        let message = [];
        error.error.details.forEach(element => {
            message.push({
                field: element.context.key,
                message: element.message.replace(/\"/g, '')
            });
        });
        return response.error(res, 422, message);
    }
    req.isApply = true;
    return next();
};

module.exports = Validate;
