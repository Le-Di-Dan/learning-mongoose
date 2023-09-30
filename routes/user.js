const {Router} = require("express")
const {checkAccessToken} = require("../middlewares/auth")
const User = require("../schemas/user")

const router = Router()


router.get("/users", checkAccessToken, async (req, res) => {
    try {
        let {keyword= ""} = req.query
        const pattern = new RegExp(keyword, "i")
        const listUsers = await User.find({user_name: {$regex: pattern}}, {_id: true, user_name: true})
        console.log(listUsers)
        res.status(200).json({
            message: "success",
            data: {
                users: listUsers
            }
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router