const Validator = require('fastest-validator');
const v = new Validator();
const User = require('../../app/Models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthRequest = {
    register,
    login,
    forgetPassword,
    resetPassword,
};

async function register(req, res, next) {
    const AuthRequest = {
        first_name: {
            type: "string",
            trim: true,
            min: 2,
            max: 255,
            messages: {
                required: "نام الزامی است",
                stringMin: "نام نباید کمتر از 2 کلمه باشد",
                stringMax: "نام نباید بیشتر از 255 کلمه باشد",
            }
        },
        last_name: {
            type: "string",
            trim: true,
            min: 2,
            max: 255,
            messages: {
                required: "نام خانوادگی الزامی است",
                stringMin: "نام خانوادگی نباید کمتر از 2 کلمه باشد",
                stringMax: "نام خانوادگی نباید بیشتر از 255 کلمه باشد",
            }
        },
        username: {
            type: "string",
            trim: true,
            min: 2,
            max: 255,
            messages: {
                required: "نام کاربری الزامی است",
                stringMin: "نام کاربری نباید کمتر از 2 کلمه باشد",
                stringMax: "نام کاربری نباید بیشتر از 255 کلمه باشد",
            }
        },
        email: {
            type: "email",
            trim: true,
            messages: {
                required: "ایمیل الزامی است",
            }
        },
        password: {
            type: "string",
            trim: true,
            min: 8,
            max: 255,
            message: {
                required: "رمز عبور الزامی است",
                stringMin: "رمز عبور نباید کمتر از 8 کلمه باشد",
                stringMax: "رمز عبور نباید بیشتر از 255 کلمه باشد",
            }
        },
        confirmation_password: {
            type: "string",
            trim: true,
            min: 8,
            max: 255,
            messages: {
                required: "تکرار رمز عبور الزامی است",
                stringMin: "تکرار رمز عبور نباید کمتر از 2 کلمه باشد",
                stringMax: "تکرار رمز عبور نباید بیشتر از 255 کلمه باشد",
            }
        },
    };
    const validate = v.validate(req.body, AuthRequest);
    let errorArr = [];

    if (validate === true) {
        if (req.body.password !== req.body.confirmation_password) {
            errorArr.push({message: "کلمه های عبور یکسان نیستند"});
            return res.status(422).json({
                status: false,
                message: "failed!",
                data: null,
                errors: errorArr
            });
        }

        const username = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        const email = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (username)
            errorArr.push({message: "نام کاربری موجود است"});

        if (email)
            errorArr.push({message: "ایمیل موجود است"});

        if (username || email) {
            return res.status(422).json({
                status: false,
                message: "failed!",
                data: null,
                errors: errorArr
            });
        } else {
            next();
        }

    } else {
        validate.forEach((err) => {
            errorArr.push(err.message);
        });

        return res.status(422).json({
            state: false,
            message: "failed!",
            data: null,
            errors: errorArr
        });
    }
}

async function login(req, res, next) {
    const AuthRequest = {
        username: {
            type: "string",
            trim: true,
            min: 2,
            max: 255,
            messages: {
                required: "نام کاربری الزامی است",
                stringMin: "نام کاربری نباید کمتر از 2 کلمه باشد",
                stringMax: "نام کاربری نباید بیشتر از 255 کلمه باشد",
            }
        },
        password: {
            type: "string",
            trim: true,
            min: 8,
            max: 255,
            message: {
                required: "رمز عبور الزامی است",
                stringMin: "رمز عبور نباید کمتر از 8 کلمه باشد",
                stringMax: "رمز عبور نباید بیشتر از 255 کلمه باشد",
            }
        },
    };
    const validate = v.validate(req.body, AuthRequest);
    let errorArr = [];

    if (validate === true) {
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        //console.log(user);
        if (user){
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                errorArr.push({message: "نام کاربری یا کلمه عبور اشتباه است"});

                return res.status(401).json({
                    state: false,
                    message: "unAuthorized!",
                    data: null,
                    errors: errorArr
                });
            } else {
                req.body = user;
                next();
            }
        } else {
            errorArr.push({message: "نام کاربری یا کلمه عبور اشتباه است"});

            return res.status(401).json({
                state: false,
                message: "unAuthorized!",
                data: null,
                errors: errorArr
            });
        }
    } else {
        errorArr.push({message: "نام کاربری یا کلمه عبور اشتباه است"});

        return res.status(401).json({
            state: false,
            message: "unAuthorized!",
            data: null,
            errors: errorArr
        });
    }
}

async function forgetPassword(req, res, next) {
    const AuthRequest = {
        email: {
            type: "email",
            trim: true,
            messages: {
                required: "ایمیل الزامی است",
            }
        },
    };

    const validate = v.validate(req.body, AuthRequest);
    let errorArr = [];

    if (validate === true) {
        next();
    } else {
        validate.forEach((err) => {
            errorArr.push(err.message);
        });

        return res.status(422).json({
            state: false,
            message: "failed!",
            data: null,
            errors: errorArr
        });
    }
}

async function resetPassword(req, res, next) {
    const AuthRequest = {
        current_password: {
            type: "string",
            trim: true,
            min: 8,
            max: 255,
            messages: {
                required: "پسورد الزامی است",
            }
        },
        new_password: {
            type: "string",
            trim: true,
            min: 8,
            max: 255,
            messages: {
                required: "پسورد جدید الزامی است",
            }
        },
        new_confirmation_password: {
            type: "string",
            trim: true,
            min: 8,
            max: 255,
            messages: {
                required: "تکرار پسورد جدید الزامی است",
            }
        },
    };

    const validate = v.validate(req.body, AuthRequest);
    let errorArr = [];

    if (validate === true) {
        const userReq = jwt.decode(req.body.signature);
        console.log(userReq);
        const user = await User.findOne({
            where: {
                username: userReq.username
            }
        });
        const passwordHash = await bcrypt.hash(req.body.new_password, 10);
        const hash = bcrypt.compare(user.password, passwordHash);
        if (!hash)
            return res.status(401)
                .json({
                    state: false,
                    message: "your password is not match!",
                    data: null,
                    errors: null
                });
        next();
    } else {
        validate.forEach((err) => {
            errorArr.push(err.message);
        });

        return res.status(422).json({
            state: false,
            message: "failed!",
            data: null,
            errors: errorArr
        });
    }
}

module.exports = AuthRequest;
