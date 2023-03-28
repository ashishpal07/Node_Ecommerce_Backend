
const User = require("../models/user");

const jwt = require("jsonwebtoken");

module.exports.authMiddleware = async (req, res, next) => {
    try {
        let token;
        if(req?.headers?.authorization?.startsWith('Bearer')) {
            token = req?.headers?.authorization?.split(" ")[1];
        }

        if(token) {
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
            // console.log(decode);
            const user = await User.findById(decode?.id);
            req.user = user;
            return res.status(200).json({
                user,
                message: "user is authorize" 
            });
            next();
        } else {
            return res.status(401).json({
                message: " Unauthorized token expire please login again"
            });
        }
    } catch(err) {
        console.log("Error while authenticate user ", err);
        return res.status(500).json({
            message: "Internam server error authentication" 
        });
    }
}