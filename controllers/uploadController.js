const db = require("../db/db");

exports.uploadImage = async (req, res) => {
  try {
    let sql = "INSERT INTO  images (name) VALUES (?)";

    db.query(sql, [req.file.filename], function (err, result) {
      console.log("inserted data");
      return res.status(200).send({ result });
    });
    message = "Successfully! uploaded";

    res.redirect("./");
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

exports.getImage = async (req, res) => {
  try {
    const filename = req.params.filename;
    res.sendFile(`${__dirname}/../uploads/${filename}`);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};
