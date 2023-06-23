const express = require("express");
const router = express.Router();
var path = require('path');
const Utilizador = require("../models/utilizador.model.js");
const Equipamento = require("../models/equipamento.model.js");
const Planos = require("../models/planos.model.js");
const Planos_treino = require("../models/planos_treino.model.js");
const Exercicios = require("../models/exercicios.model.js");
var session = require('express-session');
var cookieParser = require('cookie-parser');


router.post("/login", async function (req, res) {
    try {
        const campos = req.body;
        login_action = await Utilizador.login(campos);
        var user = campos.username;


        if (login_action == 1) {
            dados = await Utilizador.getAll();
            res.render(path.resolve('views/pages/utilizadores/index.ejs'), { login_action: 1, dados: dados });
        }
        
    } catch (error) {
        console.log(error);

        res.render(path.resolve('views/pages/index.ejs'), { msg: 3 });
    }
});

    router.get("/registo", async function(req,res){
        res.render(path.resolve('views/pages/utilizadores/register.ejs'), {msg:0});
    });

    router.post("/registar", async function (req, res) {
        const campos = req.body;
    
        try {
            registo = await Utilizador.registo(campos);
            res.render(path.resolve('views/pages/index.ejs'), {msg:2});
        } catch (error) {
            res.render(path.resolve('views/pages/utilizadores/register.ejs'), {msg: 1});
        }
    });


    module.exports = router;