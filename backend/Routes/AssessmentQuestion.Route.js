const express = require("express");
const { create, get, update, remove, list } = require("../controller/Assessment/AssessmentQuestion.Controller");

const assesmentQuestionRouter = express.Router();

assesmentQuestionRouter.post("/create-question", create);
assesmentQuestionRouter.get("/list-question/:id", list);
assesmentQuestionRouter.get("/get-question/:id", get);
assesmentQuestionRouter.put("/update-question/:id", update);
assesmentQuestionRouter.delete("/delete-question/:id", remove);

module.exports = assesmentQuestionRouter;
