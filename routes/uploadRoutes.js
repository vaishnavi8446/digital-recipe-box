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
        "File must be of type JPG, JPEG, or PNG and not more than 2MB in size"
      )
    );
  }
  cb(undefined, true);
};

const upload = multer({
  storage: storage,
  limits: limits,
  fileFilter: fileFilter,
});

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /uploads/uploadImage:
 *   post:
 *     summary: Upload an image
 *     tags: [Upload APIs]
 *     description: Uploads an image file.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               upload:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Image uploaded successfully
 *       '400':
 *         description: Bad request, invalid file format or size
 *       '401':
 *         description: Unauthorized, token is missing or invalid
 *       '500':
 *         description: Internal server error
 */

router.post(
  "/uploadImage",
  verifyToken,
  upload.single("upload"),
  uploadController.uploadImage
);

/**
 * @swagger
 * /uploads/getAllImages/{filename}:
 *   get:
 *     summary: Get an image by filename
 *     tags: [Upload APIs]
 *     description: Retrieves an image by its filename.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: filename
 *         description: Image filename
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Image retrieved successfully
 *       '401':
 *         description: Unauthorized, token is missing or invalid
 *       '404':
 *         description: Image not found
 *       '500':
 *         description: Internal server error
 */

router.get("/getAllImages/:filename", verifyToken, uploadController.getImage);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /uploads/getImageById/{id}:
 *   get:
 *     summary: Get an image by ID
 *     tags: [Upload APIs]
 *     description: Retrieves an image by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Image ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Image retrieved successfully
 *       '400':
 *         description: Bad request, invalid ID format
 *       '401':
 *         description: Unauthorized, token is missing or invalid
 *       '404':
 *         description: Image not found
 *       '500':
 *         description: Internal server error
 */

router.get("/getImageById/:id", verifyToken, uploadController.getImageById);

module.exports = router;
