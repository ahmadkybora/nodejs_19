const jwt = require('jsonwebtoken');
const Token = require('../app/Models/TokenModel');
const dotenv = require('dotenv');
dotenv.config();

async function isLoggedIn(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (authHeader === null) {
        return res.status(401).json({
            state: true,
            message: "unAuthorized!",
            data: null,
            errors: null
        });
    }

    const token = authHeader && authHeader.split(' ')[1];
    let result = jwt.decode(token);
    const user = await Token.findOne({
        where: {
            userId: result.id,
        }
    });

    if (!user) {
        return res.status(401).json({
            state: true,
            message: "unAuthorized!",
            data: null,
            errors: null
        });
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err, user) {
                console.log(user);
                req.body = user;
                next();
                /*return res.status(401).json({
                    state: true,
                    message: "unAuthorized!",
                    data: null,
                    errors: null
                });*/
            } else {
                req.body = user;
                next();
            }
        })
    }
}

module.exports = isLoggedIn;

