const validation = require("../helpers");
const express = require("express");
const router = express.Router();
const data = require("../data");
const pokemonData = data.pokemonData;

router.route("/pokemon").get(async (req, res) => {
  try {
    const pokemonList = await pokemonData.pokemon();
    res.json(pokemonList);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.route("/pokemon/:id").get(async (req, res) => {
  try {
    req.params.id = validation.isValidId(req.params.id);
    const pokemon = await pokemonData.pokemonById(req.params.id);
    res.json(pokemon);
  } catch (error) {
    if (error === "Invalid URL Parameter") {
      res.status(400).json(error);
    } else if(error === "Pokémon Not Found!") {
      res.status(404).json(error);
    }
  }
});

module.exports = router;
