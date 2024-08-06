const mongoose = require("mongoose")

const authSchema = new mongoose.Schema({
    answers: [{
        type: String,
        required: true
    }],
    formId: {
        type: mongoose.Types.ObjectId,
        ref: "questions"
    }
})

module.exports = mongoose.model("responses", authSchema)