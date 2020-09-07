
const { check, validationResult } = require('express-validator');


module.exports.signupValidation=[
    check('firstName','invalid firstName').matches(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/),
    check('lastName','invalid lastName').matches(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/),
    check('email','invalid email').isEmail(),
    check('password','invalid password').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
    check('confirmPassword','invalid confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }
        return true;
      })
];