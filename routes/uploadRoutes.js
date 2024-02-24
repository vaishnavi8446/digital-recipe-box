const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController");
const { verifyToken } = require("../shared/middleware");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const limits = {
  fileSize: 4000000,
};

const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(
      new Error(
        "File must be of type JPG, JPEG, or PNG and nore more than 2MB in size"
      )
    );
  }
  cb(undefined, true);
};

const upload = multer({
  storage: storage,
  limits: limits,
  fileFilter: fileFilter,
  // filename: filename
});

router.post(
  "/uploadImage",
  upload.single("upload"),
  verifyToken,
  uploadController.uploadImage
);

router.get("/getAllImages/:filename", verifyToken, uploadController.getImage);

router.get("/getImageById/:id", verifyToken, uploadController.getImageById);

module.exports = router;
