const jwt = require('jsonwebtoken');

const generatToken = {
    generateAccessToken,
    generateSignature
};

function generateAccessToken(username, id) {
    return jwt.sign({
            username,
            id,
        },
        'mysecretkey',
        //process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '2h'});

}

function generateSignature(username, id) {
    return jwt.sign({
            username,
            id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '1500s'});
}

module.exports = generatToken;
