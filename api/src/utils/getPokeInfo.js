require("dotenv").config();
const axios = require("axios");
const { Pokemon, Type } = require("../db");
const { Op } = require("sequelize");
const { response } = require("express");

let pokemonsApi = [];

const getPokeApi = async () => {
  //TRAE TODOS LOS POKEMONS DE LA API
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

const getPokeName = async (name) => {
  //TRAE TODOS LOS POKEMONES POR NOMBRE
  const apiName = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`))
    .data;

  const pokeNames = [apiName];

  const obj = pokeNames.map((e) => {
    return {
      id: e.id,
      name: e.name,
      imageCard: e.sprites.front_default,
      types: e.types.map((e) => e.type.name),
    };
  });

  return obj;
};

const getPokeId = async (id) => {
  const pokeId = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const response = pokeId.data;

  const pokemonId = {
    id: response.id,
    name: response.name,
    imageCard: response.sprites.front_default,
    types: response.types.map((e) => ({ name: e.type.name })),
    attack: response.stats[1].base_stat,
    defense: response.stats[2].base_stat,
    speed: response.stats[5].base_stat,
    height: response.height,
    weight: response.weight,
  };

  return pokemonId;
};

const getPokeDb = async (name) => {
  if (!name) {
    let dbInfo = await Pokemon.findAll({
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
    let dbName = Pokemon.findAll({
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

const getAllName = async (name) => {
  const apiPoke = await getPokeName(name);

  if (apiPoke === false) {
    const dbData = await getPokeDb(name);
    return dbData;
  } else {
    return apiPoke;
  }
};

module.exports = { getPokeApi, getPokeDb, getPokeName, getAllName, getPokeId };
