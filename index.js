const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
require("dotenv").config({ path: "./.env" })


const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(cookieParser())

app.use("/api/google-auth", require("./routes/authRoute"))
app.use("/api/form", require("./routes/formRoute"))

app.use("*", (req, res) => {
    res.status(404).json({ message: "Resource not found" })
})

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message })
    next()
})

mongoose.connect(process.env.MONGO_URL)

mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED")
    app.listen(process.env.PORT, console.log("SERVER RUNNING"))
})