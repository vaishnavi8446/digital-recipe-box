const conn = require("../db/db");
const { addImage, fetchImage, getImageById } = require("../db/uploadDB");

exports.uploadImage = async (req, res) => {
  try {
    const { originalname, mimetype, size } = req.file;
    const uploadRes = await addImage(conn, originalname, mimetype, size);

    if (!uploadRes) {
      return res
        .status(500)
        .send({ status_code: 500, message: "Failed to upload recipe image" });
    }
    return res.status(200).send({
      status_code: 200,
      message: "Successfully uploaded!",
      data: uploadRes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

exports.getImage = async (req, res) => {
  try {
    const filename = req.params.filename;
    const fetchImageRes = await fetchImage(conn, filename);
    if (!fetchImageRes) {
      return res
        .status(500)
        .send({ status_code: 500, message: "Failed to fetch recipe image" });
    }
    return res.status(200).send({
      status_code: 200,
      message: "Successfully fetched all the images!",
      data: fetchImageRes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

exports.getImageById = async (req, res) => {
  try {
    const id = req.params.id;
    const fetchImageRes = await getImageById(conn, id);
    if (!fetchImageRes) {
      return res
        .status(500)
        .send({ status_code: 500, message: "Failed to fetch recipe image" });
    }
    return res.status(200).send({
      status_code: 200,
      message: "Successfully fetched image!",
      data: fetchImageRes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};
