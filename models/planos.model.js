//importação da ligação à base de dados
const { promise } = require('./conexao.db');
const conexao = require('./conexao.db');

//definição da tabela na bd de forma abstrata
const Planos = function (dados) {
    this.nome = dados.nome,
    this.cliente = dados.cliente,
    this.datai = dados.datai,
    this.dataf = dados.dataf
}  


Planos.registo = async (criar, callback) => {
    const today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    try {
        var data = yyyy + '/' + mm + '/' + dd;
        await conexao.promise().query('INSERT INTO planos(nome,data_inicio,data_fim,data_criacao,data_atualizacao) VALUES(?,?,?,?,?)', [criar.nome, criar.datai, criar.dataf,data,data]);
        criado = await Planos.getSpecific(criar);
        callback(null, criado[0]);
    } catch (error) {
        console.error(error);
        callback(error, null);
    }
};





Planos.atualizar = async (mudar,id_plano, result) =>{
    const today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var data = yyyy + '/' + mm + '/' + dd;
    const user = await conexao.promise().query(
        `UPDATE planos SET nome='${mudar.nome}',data_inicio='${mudar.datai}',data_fim='${mudar.dataf}', data_atualizacao='${data}' WHERE plano_id = '${id_plano}' `);

};




Planos.findById = async (plano_id) => {
    try {
        const dados = await conexao.promise().query(`SELECT planos.data_inicio as p_datai, planos.data_fim as p_dataf, planos_treino.plano_id as id_plano, planos_treino.carga, planos_treino.repeticoes, planos_treino.intervalo, planos.nome as p_nome, exercicios.nome as exerc_nome, exercicios.id_exercicio as id_exercicio, equipamento.nome as equip_nome, equipamento.id_equipamento as id_equipamento, utilizador.nome as user_nome, utilizador.utilizador_id as id_utilizador, planos_treino.id_line as id_line FROM planos_treino JOIN exercicios ON exercicios.id_exercicio = planos_treino.id_exercicio JOIN equipamento ON equipamento.id_equipamento = planos_treino.id_equipamento JOIN utilizador ON utilizador.utilizador_id = planos_treino.utilizador_id JOIN planos ON planos.plano_id = planos_treino.plano_id WHERE planos_treino.plano_id = '${plano_id}' AND equipamento.estado = 1`);
        return(dados[0]);
    } catch (error) {
        console.error(error);
        callback(error, null);
    }
};

//pesquisa e retorna um registo de acordo com o seu ID
Planos.findNameById = async (plano_id, result) => {
    const dados_name = await conexao.promise().query(`SELECT planos_treino.plano_id as id_plano, planos_treino.carga, planos_treino.repeticoes, planos_treino.intervalo, planos.nome as p_nome, exercicios.nome as exerc_nome, exercicios.id_exercicio as id_exercicio, equipamento.nome as equip_nome, equipamento.id_equipamento as id_equipamento, utilizador.nome as user_nome, utilizador.utilizador_id as id_utilizador FROM planos_treino JOIN exercicios ON exercicios.id_exercicio = planos_treino.id_exercicio JOIN equipamento ON equipamento.id_equipamento = planos_treino.id_equipamento JOIN utilizador ON utilizador.utilizador_id = planos_treino.utilizador_id JOIN planos ON planos.plano_id = planos_treino.plano_id WHERE planos_treino.plano_id = '${plano_id}' AND equipamento.estado = 1 LIMIT 1`);
        return (dados_name[0]);
};

Planos.getSpecific = async (criar, result) =>{
    const dados = await conexao.promise().query(`SELECT plano_id FROM planos WHERE nome = '${criar.nome}' AND data_inicio = '${criar.datai}' AND data_fim = '${criar.dataf}' LIMIT 1`);
    return (dados[0]);
};




Planos.getAll = async (callback) => {
    try {
        const dados = await conexao.promise().query('SELECT planos.data_inicio as planos_datai,utilizador.utilizador_id as id_user, planos.data_fim as planos_dataf, planos.plano_id, planos.nome as plano_nome, utilizador.nome FROM planos JOIN planos_treino ON planos.plano_id = planos_treino.plano_id JOIN utilizador ON utilizador.utilizador_id = planos_treino.utilizador_id GROUP BY planos.plano_id, utilizador.utilizador_id');
        callback(null, dados[0]);
    } catch (error) {
        console.error(error);
        callback(error, null);
    }
};





//remove o registo de acordo com o id
Planos.remove = async(plano_id,id_equipamento,id_utilizador,id_exercicio, result) => {

    conexao.query(`DELETE FROM planos_treino WHERE plano_id='${plano_id}'`, (error, res) => {
        if (error) {
            console.log("error: ", error);
            return;
        }
        console.log("Planos apagado com o ID de equipamento, id de plano, id de utilizador: ", id_equipamento,plano_id,id_utilizador);
    });

};


module.exports = Planos;