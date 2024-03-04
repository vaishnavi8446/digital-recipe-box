const fetchRecipe = (conn) => {
  return new Promise((resolve, reject) => {
    conn.query("SELECT * FROM recipes", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const fetchRecipeById = (conn, id) => {
  return new Promise((resolve, reject) => {
    conn.query("SELECT * FROM recipes WHERE id = ?", [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
};

const addRecipe = (conn, title, description, ingredients, instructions) => {
  return new Promise((resolve, reject) => {
    conn.query(
      "INSERT INTO recipes (title, description, ingredients, instructions) VALUES (?, ?, ?, ?)",
      [title, description, ingredients, instructions],
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

const updateRecipe = (
  conn,
  title,
  description,
  ingredients,
  instructions,
  id
) => {
  return new Promise((resolve, reject) => {
    conn.query(
      "UPDATE recipes SET title = ?, description = ?, ingredients = ?, instructions = ? WHERE id = ?",
      [title, description, ingredients, instructions, id],
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

const CheckIdExists = (conn, id) => {
  return new Promise((resolve, reject) => {
    conn.query("SELECT * FROM recipes WHERE id = ?", [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results.length > 0) {
          resolve(true); // ID exists
        } else {
          resolve(false); // ID does not exist
        }
      }
    });
  });
};

const delRecipe = (conn, id) => {
  return new Promise((resolve, reject) => {
    conn.query("DELETE FROM recipes WHERE id = ?", [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  fetchRecipe,
  fetchRecipeById,
  addRecipe,
  updateRecipe,
  CheckIdExists,
  delRecipe,
};
