const express = require("express");
const router = express.Router();
router.use(express.json());

const PlanosController = require("../controllers/planos.controller.js");



router.get("/planos", PlanosController.findAll);

router.post("/planos", PlanosController.create);

router.put("/planos/:id", PlanosController.update);

router.delete("/planos/:id", PlanosController.delete);

router.get("/planos/visualizar/:id", PlanosController.findOne);

router.get("/planos/form", PlanosController.getUtilizador);

router.get("/planos/getValuesEx", PlanosController.getValuesEx);

router.get("/planos/getValuesEq", PlanosController.getValuesEq);

router.post("/planos/create/dentroplano/:id", PlanosController.createDentro);

router.delete("/planosDentro/:id", PlanosController.deleteFromPlano);






  module.exports = router;