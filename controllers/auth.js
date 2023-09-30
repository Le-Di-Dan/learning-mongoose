const User = require("../schemas/user")
const tokenManager = require("../utils/jwt")
const {verifyRefreshToken} = require("../utils/jwt");
const bcrypt = require("bcrypt")
const signUp = async (req, res) => {
    try {
        let {user_name, user_email, password} = req.body;
        password = await bcrypt.hash(password, 10)
        const user = new User({
            user_name,
            user_email,
            password
        })
        const user_id = (await user.save())._id
        res.status(201).json({
            message: "Sign up succeeded.",
        })
    } catch (error) {
        res.status(400).json({message: "Sign up new account failed."})
    }
}
const login = async (req, res) => {
    try {
        let {user_email, password} = req.body
        const user = await User.findOne({user_email})
        if(!user) {
            throw new Error("Account does not exist.")
        }
        const isCorrectPassword = await bcrypt.compare(password, user.password)
        if(!isCorrectPassword) {
            throw  new Error("Password is not correct.")
        }
        const refresh_token = tokenManager.generator({user_name: user.user_name, user_email: user.user_email, password: user.password}, "RFT")
        const access_token = tokenManager.generator({user_name: user.user_name, user_email: user.user_email, password: user.password}, "ACT")
        await User.updateOne({_id: user._id}, {$set: {refresh_token}})
        res.status(200).json({
            message: "Login succeeded.",
            data: {
                user: {
                    id: user._id,
                    user_email: user.user_email
                },
                access_token,
                refresh_token
            }
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Login failed."
        })
    }
}
const logout = async (req, res) => {
    try {
        const refresh_token = req.headers["refresh_token"]
        const user = await User.findOne({refresh_token})
        if(!user) {
           return res.status(400).json({message: "Logout failed."})
        }
        await User.updateOne({refresh_token}, {$set: {refresh_token: ""}})
        res.status(200).json({message: "Logout succeeded."})
    } catch (error) {
        res.status(400).json({message: "Logout failed."})
    }
}

const renew = async (req, res) => {
    res.status(200).json({
        message: "success",
        data: {
            access_token: tokenManager.generator(req.user, "ACT")
        }
    })
}

const me = async (req, res) => {
    try {
        const refresh_token = req.headers["refresh_token"]
        const user = await User.findOne({refresh_token})
        if(!user) {
            throw new Error("Can not find user.")
        }
        res.status(200).json({
            message: "success",
            data: {
                user: {
                    _id: user._id,
                    user_name: user.user_name,
                    user_email: user.user_email
                }
            }
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({message: "Get me failed"})
    }
}
module.exports = {
    signUp,
    login,
    logout,
    renew,
    me
}