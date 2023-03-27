
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
            message: "Internal server error create user"
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
            message: "Internal server error login user",
        });
    }   
}


module.exports.updateUser = async (req, res) => {
    const { id } = req.params;

    try {
        const updateUser = await User.findByIdAndUpdate(id, {
            firstName: req?.body?.firstname,
            lastName: req?.body?.lastname,
            mobile: req?.body?.mobile,
            email: req?.body?.email
        },{
            new: true
        });

        return res.status(200).json({
            updateUser
        });
    } catch(err) {
        return res.status(500).json({
            message: "Internal server error updating user"
        });
    }
}



module.exports.getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        if(allUsers.length == 0) {
            return res.status(200).json({
                message: "No users are present"
            });
        }

        return res.status(200).json({
            allUsers
        });
    } catch(err) {
        console.log("Error while getting all users ", err);
        return res.status(500).json({
            message: "Internal server error get all users"
        });
    }
}


module.exports.getUser = async (req, res) => {
    try{
        const { id } = req.params;
        const findUser = await User.findById(id);

        if(findUser) {
            return res.status(200).json({
                findUser
            });
        } 

        return res.status(404).json({
            message: "User not found"
        });
    } catch(err) {
        console.log("Error while find user by id ", err);
        return res.status(500).json({
            message: "Internal server error getting user"
        });
    }
}


module.exports.deleteUser = async (req, res) => {
    try{
        const { id } = req.params;
        const deleteUser = await User.findByIdAndDelete(id);

        if(deleteUser) {
            return res.status(200).json({
                deleteUser
            });
        } 

        return res.status(404).json({
            message: "User not found"
        });
    } catch(err) {
        console.log("Error while deleting user by id ", err);
        return res.status(500).json({
            message: "Internal server error deleting user"
        });
    }
}