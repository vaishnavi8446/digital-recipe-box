const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");
const { verifyToken } = require("../shared/middleware");

router.get("/getRecipe", verifyToken, recipeController.getRecipe);
router.get("/getRecipe/:id", verifyToken, recipeController.getRecipeById);
router.post("/createRecipe", verifyToken, recipeController.createRecipe);
router.put("/updateRecipe/:id", verifyToken, recipeController.updateRecipe);
router.delete("/deleteRecipe/:id", verifyToken, recipeController.deleteRecipe);

module.exports = router;
