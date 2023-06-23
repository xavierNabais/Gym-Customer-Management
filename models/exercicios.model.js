//importação da ligação à base de dados
const { promise } = require('./conexao.db');
const conexao = require('./conexao.db');

//definição da tabela na bd de forma abstrata
const Exercicios = function (dados) {
    this.nome = dados.nome,
    this.equipamento = dados.equipamento,
    this.musculo = dados.musculo
}  

Exercicios.create = async (criar, res) => {
    const user = await conexao.promise().query('INSERT INTO exercicios(nome,equipamento,musculo) VALUES(?,?,?)', [criar.nome, criar.equipamento, criar.musculo]);
};


//update registo
Exercicios.update = async (mudar, result) => {
    const user = await conexao.promise().query(
        `UPDATE exercicios SET nome='${mudar.nome}',equipamento='${mudar.equipamento}',musculo='${mudar.musculo}' WHERE id_Exercicio = '${mudar.numero}'`);
};

//pesquisa e retorna um registo de acordo com o seu ID
Exercicios.findById = async (user_id) => {
    try {
        const user = await conexao.promise().query(`SELECT * FROM exercicios WHERE id_exercicio = ${user_id}`);
        if (user[0].length === 0) {
            throw { result: "não encontrado" };
        }
        return user[0][0];
    } catch (err) {
        console.error(err);
        throw err;
    }
};



Exercicios.getAll = async (callback) => {
    try {
        const dados = await conexao.promise().query('SELECT * FROM exercicios');
        callback(null, dados[0]);
    } catch (error) {
        console.error(error);
        callback(error, null);
    }
};


//remove o registo de acordo com o id
Exercicios.remove= (id, result) => {
    conexao.query('DELETE FROM planos_treino WHERE id_exercicio = ?', id, (error, res) => {
        if (error) {
            console.log("error: ", error);
            
            return;
        }
        console.log("Registo apagado em plajnos_treino com o id de exercício: ", id);
    });
    conexao.query('DELETE FROM exercicios WHERE id_exercicio = ?', id, (error, res) => {
        if (error) {
            console.log("error: ", error);
            
            return;
        }
        console.log("Exercicios apagado com o ID: ", id);
    });

};


module.exports = Exercicios;