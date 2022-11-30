const axios = require("axios");

const URL = "https://pokeapi.co/api/v2/pokemon";
const pokemon = async () => {
  const { data } = await axios.get(URL);
  if (data) return data;
  else throw "Data not found!";
};

const pokemonById = async (id) => {
  if (!/^\d+$/.test(id) || id === '0')
    throw "Invalid URL Parameter";

  try {
    const dataById = await axios.get(URL + "/" + id);
    return dataById.data;
  } catch (error) {
    throw "Pokémon Not Found!";
  }
};

module.exports = {
  pokemon,
  pokemonById,
};
