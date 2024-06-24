const ShortlistedRoute = require('express').Router();
const { createShortlist, getShortlist, removeShortlist } = require('../controller/Shortlisted.controller');

ShortlistedRoute.post("/create-shortlist/:HrEmail", createShortlist)
ShortlistedRoute.get("/get-shortlist/:HrEmail", getShortlist)
ShortlistedRoute.delete("/delete-shortlist/:HrEmail", removeShortlist);

module.exports = { ShortlistedRoute }