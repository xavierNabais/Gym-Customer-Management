const express = require('express');
const app = express();
const path = require('path');
const cors = require("cors");
//configurações
app.set('port', process.env.port || process.env.PORT || 5000);
app.use(express.urlencoded({extended:true}));
app.listen(app.get('port'), () => {
console.log('Servidor iniciado na porta: '+ app.get('port'));
});
app.use(express.static(path.join(__dirname, '/public')));



app.use(cors());

var rotas = require("./routes/main.route");
app.use("/", rotas);

var login = require("./routes/login.route");
app.use("/", login);

var utilizadores = require("./routes/utilizadores.route");
app.use("/", utilizadores);
var plano = require("./routes/planos.route");
app.use("/", plano);
var equipamento = require("./routes/equipamento.route");
app.use("/", equipamento);
var exercicio = require("./routes/exercicio.route");
const dbConfig = require('./config/db.config');
app.use("/", exercicio);