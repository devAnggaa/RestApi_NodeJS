const Joi = require('joi')

const registerValidation = (data) => {
    const schema = Joi.object({
        user: Joi.string()
            .required(),
        password: Joi.string()
            .required()
    })

    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        user: Joi.string()
            .required(),
        password: Joi.string()
            .required()
    })

    return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation