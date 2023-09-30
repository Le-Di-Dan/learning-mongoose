const AuthRouter = require("./auth");
const ProfileRouter = require("./profile")
const UserRouter = require("./user")
module.exports = [
  {
    prefix: "/auth",
    router: AuthRouter,
  },
  {
    prefix: "/profile",
    router: ProfileRouter
  },
  {
    prefix: "/api",
    router: UserRouter
  }
];
