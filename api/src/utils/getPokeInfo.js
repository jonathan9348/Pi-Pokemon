require("dotenv").config();
const axios = require("axios");
const { Pokemon, Type } = require("../db");
const { Op } = require("sequelize");

let pokemonsApi = [];

const getPokeApi = async () => {
  try {
    if (!pokemonsApi.length) {
      const apiInfo = await axios.get("https://pokeapi.co/api/v2/pokemon"); //20 pokemons
      const apiNext = await axios.get(apiInfo.data.next); //otros 20

      const pagesPokes = apiInfo.data.results.concat(apiNext.data.results); //unimos ambas paginas

      const allPoke = await Promise.all(
        pagesPokes.map(async (e) => (await axios.get(e.url)).data)
      ); //resolvemos promesas

      const pokeMaps = allPoke.map((e) => {
        //mapeamos toda la data
        return {
          id: e.id,
          name: e.name,
          imageCard: e.sprites.front_default,
          types: e.types.map((x) => ({ name: x.type.name })),
        };
      });
      pokemonsApi = [...pokeMaps]; //guardamos en la variable
      return pokeMaps; //devolvemos el mapeo
    }

    return pokemonsApi; //retornamos todos los pokemons guardados en la variable
  } catch (error) {
    res.status(400).send("Error");
  }
};

const getPokeDb = async (name) => {
  let dbInfo = [];
  let dbName = [];

  if (!name) {
    dbInfo = await Pokemon.findAll({
      include: [
        {
          model: Type,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    return dbInfo; //Cuando no le pasamos un name busca todos los poke de la db y sus tipos.
  } else {
    dbName = Pokemon.findAll({
      include: [
        {
          model: Type,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
      where: {
        name: { [Op.iLike]: `%${name}%` }, //Sino, busca todos segun coincida o incluya el nombre que le pasamos.
      },
    });
    return dbName;
  }
};

module.exports = getPokeApi;
