const express = require("express");
const router = express.Router();
const EquipamentoController = require("../controllers/equipamento.controller.js");


router.use(express.json());

router.get("/equipamento", EquipamentoController.findAll);

router.post("/equipamento", EquipamentoController.create);

router.put("/equipamento", EquipamentoController.update);

router.get("/equipamento/:id", EquipamentoController.findOne);

router.delete("/equipamento/:id", EquipamentoController.delete);





  module.exports = router;