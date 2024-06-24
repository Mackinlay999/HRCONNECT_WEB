const assessmentRoute = require("express").Router();
const {
  create,
  get,
  update,
  remove,
  getAll,
} = require("../controller/Assessment/Assessment.controller");
assessmentRoute.post("/create-assessment", create);
assessmentRoute.get("/get-assessment/:id", get);
assessmentRoute.get("/getAll-assessment", getAll);
assessmentRoute.put("/update-assessment/:id", update);
assessmentRoute.delete("/delete-assessment/:id", remove);

module.exports = { assessmentRoute };
