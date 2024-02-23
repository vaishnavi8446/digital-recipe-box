const Joi = require("joi");
const conn = require("../db/db");
const { addImage, fetchImage, getImageById } = require("../db/uploadDB");
const {
  getImageByIdSchema,
  getImageFilenameSchema,
} = require("../validation/uploadValidation");

exports.uploadImage = async (req, res) => {
  try {
    const { originalname, mimetype, size } = req.file;
    const uploadRes = await addImage(conn, originalname, mimetype, size);

    if (!uploadRes) {
      return res
        .status(500)
        .send({ status_code: 500, message: "Failed to upload image" });
    }

    return res.status(200).send({
      status_code: 200,
      message: "Successfully uploaded!",
      data: uploadRes,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status_code: 500, message: "Internal server error" });
  }
};

exports.getImage = async (req, res) => {
  try {
    const { filename } = await getImageFilenameSchema.validateAsync(req.params);
    if (!isNaN(filename)) {
      return res.status(400).send({
        status_code: 400,
        message: "Filename must be a string, not a number",
      });
    }
    const fetchImageRes = await fetchImage(conn, filename);

    if (!fetchImageRes) {
      return res
        .status(404)
        .send({ status_code: 404, message: "Image not found" });
    }

    return res.status(200).send({
      status_code: 200,
      message: "Successfully fetched image!",
      data: fetchImageRes,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status_code: 500, message: "Internal server error" });
  }
};

exports.getImageById = async (req, res) => {
  try {
    let id = req.params.id;
   
    const { error } = getImageByIdSchema.validate({ id });

    if (error) {
      return res
        .status(400)
        .json({ status_code: 400, error: error.details[0].message });
    }

    const fetchImageRes = await getImageById(conn, id);

    if (!fetchImageRes) {
      return res
        .status(404)
        .send({ status_code: 404, message: "Image not found" });
    }

    return res.status(200).send({
      status_code: 200,
      message: "Successfully fetched image!",
      data: fetchImageRes,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status_code: 500, message: "Internal server error" });
  }
};
