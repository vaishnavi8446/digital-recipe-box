const db = require("../db/db");

exports.uploadImage = async (req, res) => {
  try {
    let sql = "INSERT INTO  images (name,type,size) VALUES (?,?,?)";

    const { originalname, mimetype, size } = req.file;
  
    db.query(sql, [originalname, mimetype, size], function (error, result) {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .send({ status_code: 500, message: "Failed to upload recipe image" });
      }
      return res.status(200).send({
        status_code: 200,
        message: "Successfully uploaded!",
        data: result,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

exports.getImage = async (req, res) => {
  try {
    const filename = req.params.filename;
    //  res.sendFile(`${__dirname}/../uploads/${filename}`);
    let sql = "SELECT * from images WHERE name = ? ";

    db.query(sql, [filename], function (error, result) {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .send({ status_code: 500, message: "Failed to fetch recipe image" });
      }
      return res.status(200).send({
        status_code: 200,
        message: "Successfully fetched image!",
        data: result,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};
