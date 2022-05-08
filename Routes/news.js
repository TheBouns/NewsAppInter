const express = require("express");
const NewsController = require("../controllers/NewsController");
const router = express.Router();
const uploadGenerator = require("../middleware/multer");

router.get("/createDB", NewsController.dbNews);
router.post("/", uploadGenerator.single("image"), NewsController.create);
router.get("/", NewsController.getAllNews);
router.get("/archived", NewsController.getAllNewsArchived);
router.put("/:_id", NewsController.setArchived);
router.delete("/delete/:_id", NewsController.deleteNew);
router.get("/find/:title", NewsController.findNew);

module.exports = router;
