const express = require("express");
const cors = require("cors");
const { initializeDatabase } = require("./db/db.connect");
const Recipe = require("./models/recipes.models");

const app = express();
app.use(express.json());
app.use(cors());

initializeDatabase();

// 3
app.post("/recipes", async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).json({ message: "Recipe created successfully", recipe });
  } catch (error) {
    res.status(500).json({ error: "Failed to create recipe" });
  }
});

// 6
app.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

// 7
app.get("/recipes/title/:title", async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ title: req.params.title });
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipe" });
  }
});

// 8
app.get("/recipes/author/:author", async (req, res) => {
  try {
    const recipes = await Recipe.find({ author: req.params.author });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

// 9
app.get("/recipes/difficulty/easy", async (req, res) => {
  try {
    const recipes = await Recipe.find({ difficulty: "Easy" });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

// 10
app.post("/recipes/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { difficulty: req.body.difficulty },
      { new: true },
    );
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    res.status(200).json({ message: "Recipe updated", recipe });
  } catch (error) {
    res.status(500).json({ error: "Failed to update recipe" });
  }
});

// 11
app.post("/recipes/title/:title", async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndUpdate(
      { title: req.params.title },
      { prepTime: req.body.prepTime, cookTime: req.body.cookTime },
      { new: true },
    );
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    res.status(200).json({ message: "Recipe updated", recipe });
  } catch (error) {
    res.status(500).json({ error: "Failed to update recipe" });
  }
});

// 12
app.delete("/recipes/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete recipe" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
