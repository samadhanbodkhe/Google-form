const asyncHandler = require("express-async-handler")
const Form = require("../modal/Form")
const Response = require("../modal/Response")
const Result = require("../modal/Result")



exports.getAllForm = asyncHandler(async (req, res) => {
    const result = await Form.find()
    res.status(200).json({ message: "All Form Fetch Success", result })

})

exports.getSingleForm = asyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await Form.findOne({ _id: id })
    res.status(200).json({ message: "Form Fetch Success", result })
})

exports.deleteSingleForm = asyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await Form.findByIdAndDelete(id)
    res.status(200).json({ message: "Form Delete Success", result })

})
exports.updateForm = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Form.findByIdAndUpdate(id, req.body)

    res.status(200).json({ message: "Form Update Success" })
})

exports.addForm = asyncHandler(async (req, res) => {
    // console.log(req.body);
    await Form.create({ question: req.body.questions, name: req.body.name })
    res.status(201).json({ message: "Form add success" })
})

exports.submitForm = asyncHandler(async (req, res) => {
    await Response.create(req.body)
    res.status(201).json({ message: "Response create success" })
})

exports.getSingleResponse = asyncHandler(async (req, res) => {
    const { id } = req.params
    const response = await Response.findById(id)
    res.status(200).json({ message: "Respnse fetch success", response })
})

exports.compareForm = asyncHandler(async (req, res) => {
    const { main, user, id, userId } = req.body;


    // const main1 = await Form.findOne({_id:main})
    // Extract relevant question and answer pairs from main and user forms
    const mainQuestions = main.map(item => ({ question: item.question, answer: item.answer, mark: item.mark }));
    const userAnswers = user.map(item => ({ question: item.question, answer: item.answer }));

    let score = 0, right = [], wrong = []

    // Compare the user's answers to the correct answers
    mainQuestions.forEach((mainQuestion) => {
        const userAnswer = userAnswers.find(userQ => userQ.question === mainQuestion.question);
        if (userAnswer && JSON.stringify(userAnswer.answer) === JSON.stringify(mainQuestion.answer)) {
            score += mainQuestion.mark
            right.push(userAnswer)
        } else if (userAnswer && JSON.stringify(userAnswer.answer) != JSON.stringify(mainQuestion.answer)) {
            wrong.push(userAnswer)
        }
    });

    const finalScore = score
    // console.log({ rightAnswer: right, wrongAsnwer: wrong, score: finalScore, examId: id, userId });



    await Result.create({ rightAnswer: right, wrongAsnwer: wrong, score: finalScore, examId: id, userId })
    res.json({ message: "Your score is", });
});



exports.getAllQuestion = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // User responses
    const userResponse = await Response.findById(id);


    // Admin form data
    const form = await Form.findById(userResponse.formId);

    // Calculate score
    let score = 0;
    form.question.forEach((question, index) => {
        const userAnswer = userResponse.answers.find(ans => ans.question === question.question);
        if (userAnswer) {
            if (JSON.stringify(userAnswer.answer.sort()) === JSON.stringify(question.answer.sort())) {
                score += question.mark;
            }
        }
    });

    userResponse.score = score;
    await userResponse.save();

    res.status(200).json({
        message: "All question fetch success",
        userResponse,
        form
    });
});


exports.getAdminResult = asyncHandler(async (req, res) => {
    const { id, examId } = req.query
    const result = await Result.findOne({ userId: id, examId })
    // console.log(result);
    // const x = result.map(item => {
    //     if (item._id === examId) {
    //         return item
    //     }
    // })

    // console.log();
    console.log(result);



    res.json({ message: "your result", result })

})