const conn = require("../db/db");
const {
  fetchRecipe,
  fetchRecipeById,
  addRecipe,
  updateRecipe,
  CheckIdExists,
  delRecipe,
} = require("../db/recipeDB");

exports.getRecipe = async (req, res) => {
  try {
    const recipeRes = await fetchRecipe(conn);

    if (!recipeRes) {
      return res
        .status(404)
        .send({ status_code: 404, message: "Recipe not found", data: [] });
    }
    res
      .status(200)
      .send({ status_code: 200, message: "Recipes fetched!", data: recipeRes });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    let id = req.params.id;
    const recipeRes = await fetchRecipeById(conn, id);
    if (recipeRes.length > 0) {
      const recipe = recipeRes[0];
      res
        .status(200)
        .send({ status_code: 200, message: "Recipe fetched!", data: recipe });
    } else {
      res
        .status(404)
        .send({ status_code: 404, message: "Recipe not found", data: null });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status_code: 500,
      message: "Internal server error",
    });
  }
};

exports.createRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, instructions } = req.body;
    const recipeRes = await addRecipe(
      conn,
      title,
      description,
      ingredients,
      instructions
    );

    if (!recipeRes) {
      return res
        .status(404)
        .send({ status_code: 404, message: "Failed to add recipe" });
    }
    return res.status(200).send({
      status_code: 200,
      message: "Recipe added successfully!",
      data: recipeRes,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ status_code: 500, message: "Internal server error" });
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    let id = req.params.id;
    const CheckIdExistsRes = await CheckIdExists(conn, id);
    const { title, description, ingredients, instructions } = req.body;

    if (CheckIdExistsRes) {
      const updateRecipeRes = await updateRecipe(
        conn,
        title,
        description,
        ingredients,
        instructions,
        id
      );

      if (!updateRecipeRes) {
        return res
          .status(404)
          .send({ status_code: 404, message: "Failed to update recipe" });
      }

      return res.status(200).send({
        status_code: 200,
        message: "Recipe updated successfully!",
        data: updateRecipeRes,
      });
    } else {
      return res
        .status(404)
        .send({ status_code: 404, message: "id not found" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ status_code: 500, message: "Internal server error" });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    let id = req.params.id;
    const CheckIdExistsRes = await CheckIdExists(conn, id);
    const delRecipeRes = await delRecipe(conn, id);
    if (CheckIdExistsRes) {
      if (!delRecipeRes) {
        return res
          .status(500)
          .send({ status_code: 500, message: "Failed to delete recipe" });
      }
      const recipe = delRecipeRes[0];
      return res.status(200).send({
        status_code: 200,
        message: "Recipe deleted successfully!",
        data: recipe,
      });
    } else {
      return res
        .status(404)
        .send({ status_code: 404, message: "id not found" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ status_code: 500, message: "Internal server error" });
  }
};
