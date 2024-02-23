const addImage = (conn, originalname, mimetype, size) => {
  return new Promise((resolve, reject) => {
    conn.query(
      "INSERT INTO  images (name,type,size) VALUES (?,?,?)",
      [originalname, mimetype, size],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

const fetchImage = (conn, filename) => {
  return new Promise((resolve, reject) => {
    conn.query(
      "SELECT * from images WHERE name = ? ",
      filename,
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

const getImageById = (conn, id) => {
  return new Promise((resolve, reject) => {
    conn.query(
      "SELECT * from images WHERE id = ? ",
      id,
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

module.exports = {
  addImage,
  fetchImage,
  getImageById,
};
