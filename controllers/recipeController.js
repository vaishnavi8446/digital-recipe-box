const db = require("../db/db");

exports.getRecipe = (req, res) => {
  const sql = "SELECT * FROM recipes";
  db.query(sql, (error, results) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .send({ status_code: 500, message: "Internal server error" });
    }
    const recipe = results;

    if (recipe) {
      res.status(200).send({ status_code: 200, data: recipe });
    } else {
      res
        .status(404)
        .send({ status_code: 404, message: "Recipe not found", data: [] });
    }
  });
};

exports.getRecipeById = (req, res) => {
  let id = req.params.id;
  const sql = `SELECT * FROM recipes WHERE id = ?`;
  db.query(sql, id, (error, result) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .send({ status_code: 500, message: "Internal server error" });
    }

    if (result.length > 0) {
      const recipe = result[0];
      res.status(200).send({ status_code: 200, data: recipe });
    } else {
      res
        .status(404)
        .send({ status_code: 404, message: "Recipe not found", data: null });
    }
  });
};

exports.createRecipe = (req, res) => {
  try {
    const { title, description, ingredients, instructions } = req.body;
    const sql =
      "INSERT INTO recipes (title, description, ingredients, instructions) VALUES (?, ?, ?, ?)";
    db.query(
      sql,
      [title, description, ingredients, instructions],
      (error, results) => {
        if (error) {
          console.error(error);
          return res
            .status(500)
            .send({ status_code: 500, message: "Failed to add recipe" });
        }
        return res.status(200).send({
          status_code: 200,
          message: "Recipe added successfully!",
          data: results,
        });
      }
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ status_code: 500, message: "Internal server error" });
  }
};

exports.updateRecipe = (req, res) => {
  try {
    let id = req.params.id;
    const sql =
      "UPDATE recipes SET title = ?, description = ?, ingredients = ?, instructions = ? WHERE id = ?";

    const { title, description, ingredients, instructions } = req.body;
    db.query(
      sql,
      [title, description, ingredients, instructions, id],
      (error, results) => {
        if (error) {
          console.error(error);
          return res
            .status(500)
            .send({ status_code: 500, message: "Failed to update recipe" });
        }

        return res.status(200).send({
          status_code: 200,
          message: "Recipe updated successfully!",
          data: results,
        });
      }
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ status_code: 500, message: "Internal server error" });
  }
};

exports.deleteRecipe = (req, res) => {
  try {
    let id = req.params.id;
    const sql = "DELETE FROM recipes WHERE id = ?";
    db.query(sql, id, (error, results) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .send({ status_code: 500, message: "Failed to delete recipe" });
      }

      const recipe = results[0];
      return res.status(200).send({
        status_code: 200,
        message: "Recipe deleted successfully!",
        data: recipe,
      });
    }
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ status_code: 500, message: "Internal server error" });
  }
};
