const { verifyAccessToken, verifyRefreshToken} = require("../utils/jwt")
const User = require("../schemas/user");
const checkAccessToken = (req, res, next) => {
    const access_token = (req.headers.authorization ?? "").split(" ")[1]
    if(!verifyAccessToken(access_token)) {
        return res.status(401).json({
            message: "ACCESS_TOKEN_INVALID"
        })
    }
    next()
}

const checkRefreshToken = async (req, res, next) => {
    const {refresh_token} = req.body
    const isVerified = verifyRefreshToken(refresh_token)
    const user = await User.findOne({refresh_token})
    if(!isVerified || !user) {
        return res.status(401).json({
            message: "REFRESH_TOKEN_INVALID"
        })
    }
    req.user = {
        user_name: user.user_name,
        user_email: user.user_email,
        password: user.password
    }
    next()
}

module.exports = {
    checkRefreshToken,
    checkAccessToken
}