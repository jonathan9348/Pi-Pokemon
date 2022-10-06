const { Router } = require("express");
const { Type } = require("../db");

require("dotenv").config();

const router = Router();

router.get("/", async (req, res) => {
  try {
    const typesInDb = await Type.findAll();

    res.status(200).json(typesInDb);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
