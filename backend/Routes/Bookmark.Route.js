const bookmarkRoutes = require('express').Router();
const { createBookmark, getBookmark, removeBookmark, } = require("../controller/Bookmared.controller");

bookmarkRoutes.post("/create-bookamark/:HrEmail", createBookmark)
bookmarkRoutes.get("/get-bookmark/:HrEmail", getBookmark)
bookmarkRoutes.delete("/delete-bookmark/:HrEmail", removeBookmark);

module.exports = { bookmarkRoutes }