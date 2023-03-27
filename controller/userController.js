
const { generatToken } = require('../config/jwtToken');
const User = require('../models/user');


module.exports.createUser = async (req, res) => {

    try {
        const email = req.body.email;

        const findUser = await User.findOne({email: email});
        // console.log("find user = ", findUser);

        // if user exist then throw already exist else create user
        if(findUser) {
            return res.status(409).json({
                findUser,
                message: "User already exist"
            });
        } 

        const newUser = await User.create(req.body);
        return res.status(201).json({
            newUser,
            message: "User created successfully"
        });
    } catch(err) {
        console.log("Error while creating user = " + err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
    
};


module.exports.loginUser = async (req, res) => {

    try {
        const {email, password} = req.body;
        
        const findUser = await User.findOne({email: email});

        // if user exist then validate user
        if(findUser) {
            if(await findUser.checkPassword(password)) {
                return res.status(201).json({
                    _id: findUser?._id,
                    firstName: findUser?.firstName,
                    lastName: findUser?.lastName,
                    email: findUser?.email,
                    mobile: findUser?.mobile,
                    token: generatToken(findUser?._id),
                    message: "User Logged In"
                });
            } else {
                return res.status(403).json({
                    message: "Invalid credentials"
                });
            }
        } 
        
        return res.status(404).json({
            message: "User not found"
        });
    } catch(err) {
        console.log("Error while login user ", err);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
    
}


