
const User = require('../models/user');

module.exports.createUser = async (req, res) => {

    try {
        const email = req.body.email;

        const findUser = await User.findOne({email: email});
        console.log("find user = ", findUser);

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
        console.log("Error while creating sserver = " + err);
        return;
    }
    

}