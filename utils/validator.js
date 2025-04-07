let { body, validationResult } = require('express-validator')
let constants = require('./constants')
let util = require('util')
let { CreateErrorResponse } = require('./responseHandler')
let options = {
    password: {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    },
    username: {
        min: 6
    }
}

module.exports = {
    validate: function (req, res, next) {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            CreateErrorResponse(res, 400, errors.array())
        } else {
            next();
        }
    },
    SignUpValidator: [
        body("username").isLength(options.username).withMessage(util.format(constants.VALIDATOR_ERROR_USERNAME, options.username.minLength)),
        body("password").isStrongPassword(options.password).withMessage(util.format(constants.VALIDATOR_ERROR_PASSWORD,
            options.password.minLength,
            options.password.minLowercase,
            options.password.minUppercase,
            options.password.minNumbers,
            options.password.minSymbols)),
        body("email").isEmail().withMessage(constants.VALIDATOR_ERROR_EMAIL)
    ],
    LoginValidator: [
        body("username").isLength(options.username).withMessage("username khong hop le"),
        body("password").isStrongPassword(options.password).withMessage("password khong hop le")
    ],
    containsSpecialCharacter: function (str) {
        const regex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
        return regex.test(str);
    },
    isNumeric: function (str) {
        const regex = /^[0-9]+$/;
        return regex.test(str);
    },

    isAlphabetic: function (str) {
        const regex = /^[a-zA-Z]+$/;
        return regex.test(str);
    }

}
// multer