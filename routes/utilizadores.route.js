const express = require("express");
const router = express.Router();
const UtilizadorController = require("../controllers/utilizador.controller.js");

router.use(express.json());

router.get("/utilizadores", UtilizadorController.findAll);

router.post("/utilizadores", UtilizadorController.create);

router.post("/utilizadores/login", UtilizadorController.login);

router.put("/utilizadores", UtilizadorController.update);

router.get("/utilizadores/:id", UtilizadorController.findOne);

router.delete("/utilizadores/:id", UtilizadorController.delete);






module.exports = router;