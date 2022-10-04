const { Router } = require("express");
const pokemonRoutes = require("./pokemons");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/pokemons", pokemonRoutes);

module.exports = router;
