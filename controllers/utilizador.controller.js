const UtilizadorModel = require("../models/utilizador.model.js");

//cria e regista um novo utiliazdor
exports.create = async (req, res) => {
    // Valida se os dados foram enviados da view 
    if(!req.body){
        res.status(400).send({
            message: "O conteúdo não pode estar vazio!"
        });
        return;
    }

    const campos = {
        nome: req.body.nome,
        username: req.body.username,
        password: req.body.password,
        cargo: req.body.cargo,
        morada: req.body.morada,
        contato: req.body.contato,
    };

    try {
        await UtilizadorModel.registo(campos);
        res.status(201).send({
            message: "Utilizador criado com sucesso!",
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Ocorreu um erro. Altere o username do utilizador."
        });
    }
};


exports.login = async (req,res) => {

  if(!req.body){
    res.status(400).send({
      message: "O conteúdo não pode estar vazio!"
    });
    return;
  }

  const campos = {
    username: req.body.username,
    password: req.body.password,
  };

  try {
    await UtilizadorModel.login(campos);
    res.status(201).send({
      message: "Login com sucesso!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Ocorreu um erro. Username ou password incorretos!"
    });
  }
};


exports.findAll =  (req, res) => {

         UtilizadorModel.getAll((error, data) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Ocorreu um erro ao tentar aceder aos dados dos utilizadores"
            });
        } else {
            res.send(data);
        }
    });
    }


exports.update = async (req, res) => {
    const mudar = req.body;
    try {
      await UtilizadorModel.update(mudar);
      res.status(200).json({
        status: "success",
        message: "Utilizador atualizado com sucesso",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Erro ao atualizar o utilizador"
      });
    }
  }
  
  exports.delete = async (req, res) => {
    try {
      const user_id = req.params.id;
      UtilizadorModel.remove(user_id);
      res.status(200).json({
        status: "success",
        message: "Utilizador removido com sucesso"
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "Erro ao remover o utilizador"
      });
    }
  }


//retorna um utilizador específico de acordo com o seu id
exports.findOne = async (req, res) => {
    try {
        const dados = await UtilizadorModel.findById(req.params.id);
        res.send(dados);
    } catch (error) {
        if (error.result === "não encontrado") {
            res.status(404).json({
                status: "error",
                message: `Utilizador com o id ${req.params.id} não encontrado.`,
            });
        } else {
            console.error(error);
            res.status(500).json({
                status: "error",
                message: `Ocorreu um erro ao tentar aceder aos dados do utilizador com o ID ${req.params.id}`,
            });
        }
    }
};
