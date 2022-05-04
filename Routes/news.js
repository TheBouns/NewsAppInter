const express = require("express");
const NewsController = require("../controllers/NewsController");
const router = express.Router();

router.get("/createDB", NewsController.dbNews);
router.post("/", NewsController.create);
router.get("/", NewsController.getAllNews);
router.put("/:_id", NewsController.setArchived);

module.exports = router;
