const { Router } = require("express")
const AuthMiddleware = require("../middlewares/auth")
const router = Router()


router.use(AuthMiddleware.checkAccessToken)
router.get("/test", (req, res) => {
    res.status(200).json({
        message: "TEST SUCCESS"
    })
})

module.exports = router