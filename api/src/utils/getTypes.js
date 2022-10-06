const { Type } = require("../db");
const axios = require("axios");

const getTypes = async () => {
  try {
    const typesApi = await axios.get("https://pokeapi.co/api/v2/type");
    const response = typesApi.data.results;

    response.forEach((e) => {
      Type.findOrCreate({
        where: { name: e.name },
      });
    });

    return "Ok";
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = getTypes;
