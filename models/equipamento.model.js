//importação da ligação à base de dados
const { promise } = require('./conexao.db');
const conexao = require('./conexao.db');

//definição da tabela na bd de forma abstrata
const Equipamento = function (dados) {
    this.nome = dados.nome,
    this.estado = dados.estado,
    this.musculo = dados.musculo
}  

Equipamento.create = async (campos, res) => {
    try {
        const user = await conexao.promise().query(`SELECT * FROM equipamento WHERE nome='${campos.nome}' LIMIT 1`);

        if (user[0].length > 0) {
            throw "Equipamento existente";
        } else {
            await conexao.promise().query(
               'INSERT INTO equipamento(nome,estado,musculo) VALUES(?,?,?)', [campos.nome, campos.estado, campos.musculo]);
            return ({status:200});
            }

    } catch (err) {
        console.error(err);
        throw err;
    }
}


//update registo
Equipamento.update = async (mudar, result) => {
    const user = await conexao.promise().query(
        `UPDATE equipamento SET nome='${mudar.nome}',estado='${mudar.estado}',musculo='${mudar.musculo}' WHERE id_equipamento = '${mudar.numero}'`);
};


Equipamento.findById = async (id) => {
    try {
        const user = await conexao.promise().query(`SELECT * FROM equipamento WHERE id_equipamento = ${id}`);
        if (user[0].length === 0) {
            throw { result: "não encontrado" };
        }
        return user[0][0];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

Equipamento.getAll = async (callback) => {
    try {
        const dados = await conexao.promise().query('SELECT * FROM equipamento');
        callback(null, dados[0]);
    } catch (error) {
        console.error(error);
        callback(error, null);
    }
};



//remove o registo de acordo com o id
Equipamento.remove= (id, result) => {
    conexao.query('DELETE FROM planos_treino WHERE id_equipamento = ?', id, (error,res) => {
        if (error){
            console.log("error: ", error);

            return;
        }
    });
    conexao.query('DELETE FROM equipamento WHERE id_equipamento = ?', id, (error, res) => {
        if (error) {
            console.log("error: ", error);
            
            return;
        }
        console.log("Equipamento apagado com o ID: ", id);
    });
};


module.exports = Equipamento;