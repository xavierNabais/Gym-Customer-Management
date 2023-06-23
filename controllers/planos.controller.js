const PlanosModel = require("../models/planos.model.js");
const UtilizadorModel = require("../models/utilizador.model.js");
const EquipamentoModel = require("../models/equipamento.model.js");
const ExerciciosModel = require("../models/exercicios.model.js");
const PlanosTreinoModel = require("../models/planos_treino.model.js");


//cria e regista um novo utiliazdor
exports.create = (req, res) => {
    //valida se os dados foram enviados da view 
    if(!req.body){
        res.status(400).send({
            message: "O conteúdo não pode estar vazio!"
        });
    }

    const Plano = new PlanosModel({
        nome: req.body.nome,
        cliente: req.body.cliente,
        datai: req.body.datai,
        dataf: req.body.dataf

    });
    PlanosModel.registo(Plano, (error, data) => {  
        if (error) {
            res.status(500).send({
                message: error.message || "Ocorreu um erro ao tentar criar um novo plano."
            });
        } else if (data) {
            res.status(200).send({
                data,
            });
        } else {
            res.status(500).send({
                message: "Ocorreu um erro ao tentar criar um novo plano. Altere o nome do plano."
            });
        }
    });
    
};


exports.createDentro = (req, res) => {
    const criar = req.body;
    const cliente_data = req.params.id;
    const [id_plano, user_id] = cliente_data.split("_");
    resultado =  PlanosTreinoModel.create(criar,id_plano,user_id);
    dados =  PlanosModel.findById(id_plano);
    res.send(dados);




};



exports.getValuesEq = (req, res) => {
    EquipamentoModel.getAll((error, data) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Ocorreu um erro ao tentar aceder aos dados dos planos"
            });
        } else {
            res.send(data);
        }
    });
};
exports.getValuesEx = (req, res) => {
    ExerciciosModel.getAll((error, data) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Ocorreu um erro ao tentar aceder aos dados dos planos"
            });
        } else {
            res.send(data);
        }
    });
};

exports.getUtilizador = async (req, res) => {
    try {
      UtilizadorModel.getAll((error, data) => {
        if (error) {
          res.status(500).json({
            status: "error",
            message: "Erro ao obter a lista de planos"
          });
        } else {
          res.send(data);
        }
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Erro ao obter a lista de planos"
      });
    }
  };

  exports.getUpdate = async (req, res) => {
    const user_id = req.params.id;
    const dados = await PlanosModel.findById(user_id);
    datainicio = new Date(dados[0].p_datai).toISOString().replace(/T/, ' ').replace(/\..+/, ',');
    datafim = new Date(dados[0].p_dataf).toISOString().replace(/T/, ' ').replace(/\..+/, ',');
    function strBefore (string, delimiter) {  
        return delimiter === ''
          ? string
          : string.split(delimiter).shift()
      }
    const datasi = datainicio;
    const p_datai = strBefore(datasi, ' ');
    const datasf = datafim;
    const p_dataf = strBefore(datasf, ' ');

          res.send(dados,p_datai,p_dataf,user_id); 

    }


exports.findAll = (req, res) => {
    PlanosModel.getAll((error, data) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Ocorreu um erro ao tentar aceder aos dados dos planos"
            });
        } else {
            res.send(data);
        }
    });
};


exports.update = async (req, res) => {

    const mudar = req.body;
    const id = req.params.id;
    try {
      await PlanosModel.atualizar(mudar,id);
      res.status(200).json({
        status: "success",
        message: "Plano atualizado com sucesso",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Erro ao atualizar o plano"
      });
    }
  }
  
  exports.delete = async (req, res) => {
    try {
      const user_id = req.params.id;
      PlanosModel.remove(user_id);
      res.status(200).json({
        status: "success",
        message: "Plano removido com sucesso"
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "Erro ao remover o plano"
      });
    }
  }

  exports.deleteFromPlano = async (req, res) => {
    try {
        const data = req.params.id;
        PlanosTreinoModel.remove(data);
        res.status(200).json({
        status: "success",
        message: "Exercício do plano de treino removido com sucesso"
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "Erro ao remover o exercício do plano de treino"
      });
    }
  }










//retorna um utilizador específico de acordo com o seu id
exports.findOne = async (req, res) => {
    try {
        const [plano_id, user_id] = req.params.id.split("_");
        const dados = await PlanosModel.findById(plano_id);
        res.send(dados);
    } catch (error) {
        if (error.result === "não encontrado") {
            res.status(404).json({
                status: "error",
                message: `Plano com o id ${req.params.id} não encontrado.`,
            });
        } else {
            console.error(error);
            res.status(500).json({
                status: "error",
                message: `Ocorreu um erro ao tentar aceder aos dados do plano com o ID ${req.params.id}`,
            });
        }
    }
};
