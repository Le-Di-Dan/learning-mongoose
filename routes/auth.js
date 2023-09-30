const express = require("express")
const AuthController = require("../controllers/auth")
const {checkAccessToken, checkRefreshToken} = require("../middlewares/auth")


const AuthRouter = express.Router()

AuthRouter.post("/sign-up", AuthController.signUp)
AuthRouter.post("/login", AuthController.login)
AuthRouter.post("/logout", AuthController.logout)
AuthRouter.post("/renew", checkRefreshToken,  AuthController.renew)
AuthRouter.get("/me", checkAccessToken, AuthController.me)
module.exports = AuthRouter