const mongoose = require("mongoose");

// Define a sub-schema for the answers
const answerSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: [String],  // Assuming answer is an array of strings
        required: true
    }
});

// Define the main schema
const resultSchema = new mongoose.Schema({
    rightAnswer: {
        type: [answerSchema],  // An array of answer objects
        required: true
    },
    wrongAsnwer: {
        type: [answerSchema],  // An array of answer objects
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    examId: { type: mongoose.Types.ObjectId, ref: "questions", required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "auth", required: true }
});

module.exports = mongoose.model("Result", resultSchema);
