const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    refresh_token: String
}, {
    timestamp: true
})

const User = mongoose.model("User", userSchema)
module.exports = User