const mongoose = require("mongoose")

const authSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    question: [
        {
            question: {
                type: String,
                required: true
            },
            options: [{
                type: String,
            }],
            type: {
                type: String,
                required: true
            },
            mark: {
                type: Number,
                required: true
            },
            answer: [{
                type: String
            }]
        }
    ]
})

module.exports = mongoose.model("questions", authSchema)