
const jwt = require("jsonwebtoken");

module.exports.generatToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET_KEY, {expiresIn: '1d'});
}
