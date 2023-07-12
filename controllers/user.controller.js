const User = require("../models/User")
const bcrypt = require('bcryptjs')
const getError = require("../utils/dbErrorHandle");

module.exports = {
    signup : async (req ,res) => {
        try {
            const {name,email,password,role} = req.body;
                const user = User({
                    name : name,
                    email: email,
                    password : password,
                    role : role
                })
                await user.save();
                const token = await user.generateAuthToken()
                return res.status(200).json({
                    email : email,
                    token : token   
                });
        } catch (error) {
            let errMsg = getError(error)
            return res.status(400).json({
                error: true,
                message:  errMsg.length > 0 ? errMsg : "Could not create user."
            })
        }
    },
    login : async (req, res) => {
        try {
            const {email, password} = req.body
            const user = await User.findByCredentials(email, password);
            const token = await user.generateAuthToken()
            return res.status(200).json({
                email : email,
                token : token
            })
        } catch (error) {
            return res.status(400).json({
                error: true,
                message: "Invalid email or password"
            })
        }
    },
}