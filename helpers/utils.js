const Joi = require("@hapi/joi");

// function to check body
const validateBody = (schema) => {
    return (req, res, next) => {
        const validatorResult = schema.validate(req.body)

        if (validatorResult.error) {
            return res.status(400).json({
                success: false,
                message: validatorResult.error.name
            })
        } else {
            if (!req.value) req.value = {}
            if (!req.value['params']) req.value.params = {}

            req.value.body = validatorResult.value
            next()
        }
    }
}

// function to check param
const validateParam = (schema, name) => {
    return (req, res, next) => {
        const validatorResult = schema.validate({param: req.params[name]})

        if (validatorResult.error) {
            return res.status(400).json({
                success: false,
                message: validatorResult.error.name
            })
        } else {
            if (!req.value) req.value = {}
            if (!req.value['params']) req.value.params = {}

            req.value.params[name] = req.params[name]
            next()
        }
    }
}

// condition
const schemas = {
    idSchema: Joi.object().keys({
        param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    registerSchema: Joi.object().keys({
        username: Joi.string().min(2),
    }),
    loginSchema: Joi.object().keys({
        username: Joi.string().min(2),
    }),
    wishSchema: Joi.object().keys({
        username: Joi.string().min(2).required(),
        content: Joi.string().min(2).required(),
    }),
}

module.exports = {
    validateBody,
    validateParam,
    schemas
}
