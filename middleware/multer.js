const multer = require("multer");
const mimetypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
const upload = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + " -" + Date.now());
  },
  fileFilter(req, file, next) {
    if (mimetypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      next({ message: "this is not a accepted file extension" }, false);
    }
  },
});

const uploadGenerator = multer({ storage: upload });

module.exports = uploadGenerator;
