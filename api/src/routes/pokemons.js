const { Router } = require("express");
const { Pokemon, Type } = require("../db");
const axios = require("axios");
const getPokeApi = require('../utils/getPokeInfo')

require("dotenv").config();

const router = Router();

router.get("/", async (req, res) => {
    try{
        const pokemons = await getPokeApi()
        res.status(200).send(pokemons)

    }catch(e){
        console.log(e)
    }
});

router.get("/:id", async (req, res) => {});

router.post("/", (req, res) => {});

router.get("/types", async (req, res) => {});
module.exports = router;
