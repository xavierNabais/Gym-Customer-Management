const express = require("express");
const router = express.Router();
var path = require('path');
const ExerciciosController = require("../controllers/exercicios.controller.js");

router.use(express.json());



router.get("/exercicios", ExerciciosController.findAll);

router.post("/exercicios", ExerciciosController.create);

router.put("/exercicios", ExerciciosController.update);

router.get("/exercicios/editar/:id", ExerciciosController.findOne);

router.delete("/exercicios/:id", ExerciciosController.delete);

router.get("/exercicios/form", ExerciciosController.getEquipamento);


 module.exports = router;