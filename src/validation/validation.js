import Joi from 'joi'

const userScheme = Joi.object({
    username: Joi.string().min(4).max(30).required(),
    password: Joi.string().pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)).required(),
    repeatPassword: Joi.ref('password'),
    email: Joi.string().pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    gender: Joi.string().valid("male", "female"),
    birthdate: Joi.number().integer().min(1900).max(2015)
})


process.JOI = {
    userScheme
}