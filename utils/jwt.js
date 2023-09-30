const jwt = require("jsonwebtoken")

const generator = (payload, type) => {
    let token = ""
    switch (type) {
        case "ACT": {
            token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "10s"
            })
            break
        }
        case "RFT": {
            token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: "30m"
            })
            break
        }
        default:
            return null
    }
    return token
}

const verifyAccessToken = (token) => {
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

const verifyRefreshToken = (token) => {
    try {
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
        return true
    } catch (error) {
        return false
    }
}

module.exports = {
    generator,
    verifyAccessToken,
    verifyRefreshToken
}