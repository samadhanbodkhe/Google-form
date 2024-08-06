const asyncHandler = require("express-async-handler")
const { OAuth2Client } = require("google-auth-library")
const jwt = require("jsonwebtoken")
const Auth = require("../modal/Auth")

exports.continueWithGoogle = asyncHandler(async (req, res) => {
    const { credential } = body.body

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

    const verify = await client.verifyIdToken({ idToken: credential })

    if (!verify) {
        return res.status(400).json({ message: "unable to verify" })
    }

    const { name, email, avatar } = verify.payload

    const result = await Auth.findOne({ email })

    if (!result) {
        const userData = await Auth.create({ name, email, photo: avatar })

        const token = jwt.sign({ userId: userData._id }, process.env.JWT_KEY, { expiresIn: "7h" })
        res.cookie("auth", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })

        return res.status(400).json({ message: "Register Success", result: { name, email, photo: avatar } })
    } else {

        const token = jwt.sign({ userId: userData._id }, process.env.JWT_KEY, { expiresIn: "7h" })
        res.cookie("auth", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
        res.json({ message: "Login Success", result })
    }

})


exports.userLogin = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const x = await Auth.findOne({ email })
    if (!x) {
        const y = await Auth.create({ name, email, password })
        return res.json({ message: "User Login Success", result: y })
    }
    res.json({ message: "User Login Success By default", result: x })
})



exports.userLogout = asyncHandler(async (req, res) => {
    res.clearCookie("user")
    res.json({ message: "User logout success" })
})