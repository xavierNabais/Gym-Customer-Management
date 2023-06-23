const EquipamentoModel = require("../models/equipamento.model.js");

//cria e regista um novo utiliazdor
exports.create = async (req, res) => {
    //valida se os dados foram enviados da view 
    if(!req.body){
        res.status(400).send({
            message: "O conteúdo não pode estar vazio!"
        });
    }
    const Equipamento = new EquipamentoModel({
        nome: req.body.nome,
        estado: req.body.estado,
        musculo: req.body.musculo,
    });

    try {
        await EquipamentoModel.create(Equipamento);
        res.status(201).send({
            message: "Equipamento criado com sucesso!",
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Ocorreu um erro ao tentar criar um novo equipamento. Altere o nome do equipamento."
        });
    }

    
    
};


exports.findAll = (req, res) => {
    EquipamentoModel.getAll((error, data) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Ocorreu um erro ao tentar aceder aos dados dos equipamentos"
            });
        } else {
            res.send(data);
        }
    });
};


exports.update = async (req, res) => {

    const mudar = req.body;
    try {
      await EquipamentoModel.update(mudar);
      res.status(201).send({
        message: "Equipamento atualizado com sucesso!",
    });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Erro ao atualizar o equipamento"
      });
    }
  }

  exports.delete = async (req, res) => {
    try {
      const user_id = req.params.id;
      EquipamentoModel.remove(user_id);
      res.status(200).json({
        status: "success",
        message: "Equipamento removido com sucesso"
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "Erro ao remover o equipamento"
      });
    }
  }


//retorna um utilizador específico de acordo com o seu id
exports.findOne = async (req, res) => {
    try {

        const dados = await EquipamentoModel.findById(req.params.id);
        res.send(dados);
    } catch (error) {
        if (error.result === "não encontrado") {
            res.status(404).json({
                status: "error",
                message: `Equipamento com o id ${req.params.id} não encontrado.`,
            });
        } else {
            console.error(error);
            res.status(500).json({
                status: "error",
                message: `Ocorreu um erro ao tentar aceder aos dados do equipamento com o ID ${req.params.id}`,
            });
        }
    }
};
