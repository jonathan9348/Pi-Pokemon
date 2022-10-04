const { Router } = require("express");
const { Pokemon, Type } = require("../db");
const axios = require("axios");
const {
  getPokeApi,
  getPokeDb,
  getPokeName,
  getAllName,
} = require("../utils/getPokeInfo");

require("dotenv").config();

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;

  try {
    if (!name) {
      const pokemons = await getPokeApi();
      const dbPokemons = await getPokeDb(name);

      const allInfo = [...pokemons, ...dbPokemons];
      res.status(200).send(allInfo);
    } else if (name) {
      const nameStr = name.toString().toLocaleLowerCase();

      const withName = await getAllName(nameStr);

      res.status(200).json(withName);
    }
  } catch (e) {
    res.status(400).send("No se encuentra el pokemon nombrado");
  }
});

router.get("/:id", async (req, res) => {});

router.post("/", async (req, res) => {
  const {
    name,
    imageCard,
    imageDetail,
    hp,
    attack,
    defense,
    speed,
    heigth,
    weigth,
  } = req.body;

  try {
    const dbPoke = await Pokemon.findOne({
      where: { name },
    });
    if (dbPoke) res.status(400).send("Este pokemon ya existe");

    const newPoke = await Pokemon.create({
      name,
      imageCard,
      imageDetail,
      hp,
      attack,
      defense,
      speed,
      heigth,
      weigth,
    });

    //const pokeTypes = await Type.findAll({
       // where: { name },
     // });

     // newPoke.addType(pokeTypes);

      res.status(200).json(newPoke);

  } catch (e) {
    res.status(400).send('No se pudo crear perrito')
  }
});

router.get("/types", async (req, res) => {});
module.exports = router;
