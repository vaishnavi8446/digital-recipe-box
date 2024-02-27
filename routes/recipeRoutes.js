const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");
const { verifyToken } = require("../shared/middleware");

/**
 * @swagger
 * /recipe/getRecipe:
 *   get:
 *     summary: Get all recipes
 *     tags: [Recipe APIs]
 *     description: Retrieve a list of all recipes.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/getRecipe", verifyToken, recipeController.getRecipe);

/**
 * @swagger
 * /recipe/getRecipe/{id}:
 *   get:
 *     summary: Get a recipe by ID
 *     tags: [Recipe APIs]
 *     description: Retrieve a recipe by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Recipe ID
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Recipe found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/getRecipe/:id", verifyToken, recipeController.getRecipeById);

/**
 * @swagger
 * /recipe/createRecipe:
 *   post:
 *     summary: Create a new recipe
 *     tags: [Recipe APIs]
 *     description: Create a new recipe.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewRecipe'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '201':
 *         description: Recipe created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post("/createRecipe", verifyToken, recipeController.createRecipe);

/**
 * @swagger
 * /recipe/updateRecipe/{id}:
 *   put:
 *     summary: Update a recipe
 *     tags: [Recipe APIs]
 *     description: Update an existing recipe by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Recipe ID
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRecipe'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Recipe updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.put("/updateRecipe/:id", verifyToken, recipeController.updateRecipe);

/**
 * @swagger
 * /recipe/deleteRecipe/{id}:
 *   delete:
 *     summary: Delete a recipe
 *     tags: [Recipe APIs]
 *     description: Delete a recipe by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Recipe ID
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '204':
 *         description: Recipe deleted successfully
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete("/deleteRecipe/:id", verifyToken, recipeController.deleteRecipe);

module.exports = router;
