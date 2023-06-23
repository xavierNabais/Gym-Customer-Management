const ExerciciosModel = require("../models/exercicios.model.js");
const EquipamentoModel = require("../models/equipamento.model.js");

//cria e regista um novo utiliazdor
exports.create = async (req, res) => {
    //valida se os dados foram enviados da view 
    if(!req.body){
        res.status(400).send({
            message: "O conteúdo não pode estar vazio!"
        });
    }

    const Exercicio = new ExerciciosModel({
        nome: req.body.nome,
        equipamento: req.body.equipamento,
        musculo: req.body.musculo,
    });


    try {
        await ExerciciosModel.create(Exercicio);
        res.status(201).send({
            message: "Exercicio criado com sucesso!",
        });
    } catch (err) {
        res.status(500).send({
            message: "Ocorreu um erro ao tentar criar um novo exercicio. Altere o nome do exercício."
        });
    }

    
};

exports.findAll = (req, res) => {
    ExerciciosModel.getAll((error, data) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Ocorreu um erro ao tentar aceder aos dados dos exercicios"
            });
        } else {
            res.send(data);
        }
    });
};


exports.update = async (req, res) => {

    const mudar = req.body;
    try {
      await ExerciciosModel.update(mudar);
      res.status(200).json({
        status: "success",
        message: "Exercicio atualizado com sucesso",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Erro ao atualizar o exercicio"
      });
    }
  }

  exports.delete = async (req, res) => {
    try {
      const user_id = req.params.id;
      ExerciciosModel.remove(user_id);
      res.status(200).json({
        status: "success",
        message: "Exercicio removido com sucesso"
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "Erro ao remover o exercicio"
      });
    }
  }


//retorna um utilizador específico de acordo com o seu id
exports.findOne = async (req, res) => {
    try {
        const dados = await ExerciciosModel.findById(req.params.id);
        res.send(dados);
    } catch (error) {
        if (error.result === "não encontrado") {
            res.status(404).json({
                status: "error",
                message: `Exercício com o id ${req.params.id} não encontrado.`,
            });
        } else {
            console.error(error);
            res.status(500).json({
                status: "error",
                message: `Ocorreu um erro ao tentar aceder aos dados do exercicio com o ID ${req.params.id}`,
            });
        }
    }
};


exports.getEquipamento = async (req,res) => {
    EquipamentoModel.getAll((error, data) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Ocorreu um erro ao tentar aceder aos dados dos exercicios"
            });
        } else {
            res.send(data);
        }
    });
}