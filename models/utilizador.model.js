//importação da ligação à base de dados
const { promise } = require('./conexao.db');
const conexao = require('./conexao.db');

//definição da tabela na bd de forma abstrata
const Utilizador = function (dados) {
    this.nome = dados.nome,
    this.username = dados.username,
    this.password = dados.password,
    this.morada = dados.morada,
    this.contato = dados.contato,
    this.cargo = dados.cargo
}  

Utilizador.registo = async (campos) => {
    try {
        const user = await conexao.promise().query(`SELECT * FROM utilizador WHERE username='${campos.username}' LIMIT 1`);

        if (user[0].length > 0) {
            throw "Utilizador existente";
        } else {
            today= new Date();
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
            await conexao.promise().query(
               'INSERT INTO utilizador(nome,username,password,cargo,morada,contato,data_criacao,data_atualizacao) VALUES(?,?,?,?,?,?,?,?)', [campos.nome, campos.username, campos.password, campos.cargo, campos.morada, campos.contato, data, data]);

            return { success: true };
        }

    } catch (err) {
        console.error(err);
        throw err;
    }
}

Utilizador.login = async(campos,res) => {  
        try {
            const user = await conexao.promise().query(`SELECT * FROM utilizador WHERE username='${campos.username}' AND password='${campos.password}' LIMIT 1`);
    
            if (user[0].length > 0) {
                return { success: true };
            } else {
                throw "Username ou password incorretos!";
            }
        } catch (err) {
            console.error(err);
            throw err;
        }



}


//update registo
Utilizador.update = async (mudar, result) => {
    const user = await conexao.promise().query(
        `UPDATE utilizador SET nome='${mudar.nome}',username='${mudar.username}',password='${mudar.password}',cargo='${mudar.cargo}',morada='${mudar.morada}', contato='${mudar.contacto}' WHERE utilizador_id = '${mudar.numero}'`);
    };



//pesquisa e retorna um registo de acordo com o seu ID
Utilizador.findById = async (user_id) => {
    try {
        const user = await conexao.promise().query(`SELECT * FROM utilizador WHERE utilizador_id = ${user_id}`);
        if (user[0].length === 0) {
            throw { result: "não encontrado" };
        }
        return user[0][0];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

Utilizador.findByName = async (user_name, result) => {
    try {
        const user = await conexao.promise().query(`SELECT * FROM utilizador WHERE nome LIKE '${user_name}'`);
        return user[0];
    }catch(err){
        console.error(err);
        throw err;
    }
}
 

Utilizador.getAll = (callback) => {
    conexao.query('SELECT * FROM utilizador', (error, results, fields) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    });
  };

//remove o registo de acordo com o id
Utilizador.remove= (id, result) => {
    conexao.query('DELETE FROM planos_treino WHERE utilizador_id = ?', id, (error, res) => {
        if (error){
            console.log("Error: ", error);

            return;
        }
        console.log("Planos de treino do utilizador apagados com sucesso: ", id);
    });
    conexao.query('DELETE FROM utilizador WHERE utilizador_id = ?', id, (error, res) => {
        if (error) {
            console.log("error: ", error);
            
            return;
        }
        console.log("Utilizador apagado com o ID: ", id);
    });
};


module.exports = Utilizador;