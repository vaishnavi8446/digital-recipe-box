const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
    // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const limits = {
  fileSize: 4000000,
};

//fileFilter function controls which files should be uploaded. req = request being made. file = contains file info. cb = callback function to tell multer when we are done filtering the file. send back an error message to the client with cb.
const fileFilter = (req, file, cb) => {
  //if the file is not a jpg, jpeg, or png file, do not upload it multer; reject it.
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(
      new Error(
        "File must be of type JPG, JPEG, or PNG and nore more than 2MB in size"
      )
    );
  }
  //undefined = nothing went wrong; true = that is true, nothing went wrong, accept the upload.
  cb(undefined, true);
};

//set up the multer middleware
const upload = multer({
  storage: storage,
  limits: limits,
  fileFilter: fileFilter,
  // filename: filename
});

router.post(
  "/uploadImage",
  upload.single("upload"),
  uploadController.uploadImage
);


router.get("/getImage/:filename", uploadController.getImage);

module.exports = router;
