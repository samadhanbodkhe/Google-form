const { continueWithGoogle, userLogin, userLogout } = require("../controller/authController")

const router = require("express").Router()

router
    .post("/continue-with-google", continueWithGoogle)
    .post("/user-login", userLogin)
    .post("/user-logout", userLogout)

module.exports = router