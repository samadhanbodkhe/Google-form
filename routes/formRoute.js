const { getAllForm, getSingleForm, deleteSingleForm, addForm, submitForm, updateForm, compareForm, getAllQuestion, getAdminResult } = require("../controller/formController")

const router = require("express").Router()

router
    .get("/get-all-form", getAllForm)
    .get("/get-one-form/:id", getSingleForm)
    .delete("/delete-one-form/:id", deleteSingleForm)
    .put("/update-form/:id", updateForm)
    .post("/add-form", addForm)
    .post("/submit-form", submitForm)
    .post("/compare-question", compareForm)
    .get("/get-all-question/:id", getAllQuestion)
    // .get("/get-result", )
    .get("/get-result", getAdminResult)

module.exports = router