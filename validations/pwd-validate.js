const Joi = require('joi');
const Validate = (req, res, next) => {
    const schema = Joi.object().keys({
        emailId: Joi.string().required().label('emailId'),
        password: Joi.string().required().label('password'),
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
