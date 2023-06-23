//importação da ligação à base de dados
const { promise } = require('./conexao.db');
const conexao = require('./conexao.db');

//definição da tabela na bd de forma abstrata
const Planos_treino = function (dados) {
    this.nome = dados.nome,
    this.username = dados.username,
    this.password = dados.password,
    this.morada = dados.morada,
    this.contato = dados.contato,
    this.cargo = dados.cargo
}  


Planos_treino.create = async (criar,id_plano,utilizador_id) => {
    
    try {
            const id_exercicio = criar.exercicio;
            const id_equipamento = criar.equipamento;
            await conexao.promise().query('INSERT INTO planos_treino(id_equipamento,plano_id,id_exercicio,utilizador_id,repeticoes,carga,intervalo) VALUES(?,?,?,?,?,?,?)', [id_equipamento, id_plano, id_exercicio, utilizador_id, criar.repeticoes, criar.carga, criar.intervalo]);
            return { success: true };
        }

     catch (err) {
        console.error(err);
        throw err;
    }
}

//update registo
Planos_treino.update = async (mudar, result) => {
    
    /*const user = await conexao.promise().query(
        `UPDATE planos_treino_treino SET nome='${mudar.nome}',username='${mudar.username}',cargo='${mudar.cargo}',morada='${mudar.morada}', contato='${mudar.contato}' WHERE plano_id = '${mudar.numero}'`);
        */
       console.log(mudar);
    };



//pesquisa e retorna um registo de acordo com o seu ID
Planos_treino.findById = async (plano_id, result) => {
    const dados = await conexao.promise().query(`SELECT planos_treino_treino.plano_id as id_plano, planos_treino_treino.carga, planos_treino_treino.repeticoes, planos_treino_treino.intervalo, planos_treino.nome as p_nome, exercicios.nome as exerc_nome, exercicios.id_exercicio as id_exercicio, equipamento.nome as equip_nome, equipamento.id_equipamento as id_equipamento, utilizador.nome as user_nome, utilizador.utilizador_id as id_utilizador FROM planos_treino_treino JOIN exercicios ON exercicios.id_exercicio = planos_treino_treino.id_exercicio JOIN equipamento ON equipamento.id_equipamento = planos_treino_treino.id_equipamento JOIN utilizador ON utilizador.utilizador_id = planos_treino_treino.utilizador_id JOIN planos_treino ON planos_treino.plano_id = planos_treino_treino.plano_id WHERE planos_treino_treino.plano_id = '${plano_id}' AND equipamento.estado = 1`);
        return (dados[0]);
};
 

Planos_treino.getAll = async result => {
    const dados = await conexao.promise().query('SELECT planos_treino.data_inicio as planos_treino_datai, planos_treino.data_fim as planos_treino_dataf, planos_treino.plano_id, planos_treino.nome as plano_nome, utilizador.nome FROM planos_treino JOIN planos_treino_treino ON planos_treino.plano_id = planos_treino_treino.plano_id JOIN utilizador ON utilizador.utilizador_id = planos_treino_treino.utilizador_id GROUP BY planos_treino.plano_id');
    return(dados[0]);
};




//remove o registo de acordo com o id
Planos_treino.remove = async(id, result) => {

    conexao.query(`DELETE FROM planos_treino WHERE id_line='${id}'`, (error, res) => {
        if (error) {
            console.log("error: ", error);
            return;
        }
        console.log("planos_treino apagado com o ID ", id);
    });

};


module.exports = Planos_treino;