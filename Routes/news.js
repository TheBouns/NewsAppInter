const express = require("express");
const NewsController = require("../controllers/NewsController");
const router = express.Router();

router.get("/createDB", NewsController.dbNews);
router.post("/", NewsController.create);

module.exports = router;
