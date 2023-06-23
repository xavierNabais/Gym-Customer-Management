import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EditComponent() {

    const { id } = useParams();

    const [listaDados, setListaDados] = useState([]);

    const [message, setMessage] = useState('');

    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (message) {
          // Esperar 5 segundos e recarregar a página
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }, [message]);




    useEffect(() => {
        axios.get("http://localhost:5000/utilizadores/"+id)
        .then ((res) => {
            if (res.statusText === 'OK') {
                console.log(res);
                const dados = res.data;
                setListaDados(dados);
            } else {
                alert("Erro na ligação à API!");
            }
        })
        .catch((error) => {
            alert(error);
        });
    }, []);

    const handleSubmit = event => {
        event.preventDefault();
        const numero = id;
        const nome = event.target.nome.value;
        const username = event.target.username.value;
        const password = event.target.password.value;
        const cargo = event.target.cargo.value;
        const morada = event.target.morada.value;
        const contacto = event.target.contacto.value;

        const datapost = {numero,nome,username,password,cargo,morada,contacto};

        axios
            .put("http://localhost:5000/utilizadores", datapost)
            .then ((response) => {
                if (response.status === 200) {
                    setMessage('Utilizador alterado com sucesso!');
                    setIsSuccess(true);
                }else{
                    setMessage('O utilizador não foi alterado!');
                    setIsSuccess(false);
                }
            })
            .catch ((error) => {
                setMessage('Não foi possível alterar o utilizador!');
                setIsSuccess(false);
            });


    }

    return <>
            <div className="container rounded shadow p-4">
                    <h5 className="mb-0">Editar utilizador</h5>
            <hr/>

            {message && (
          <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`}>
            {message}
          </div>
        )}  



        <form onSubmit={handleSubmit}>
        <div className="form-group row py-2">
                <label htmlFor="inputNome" className="col-md-1 text-end fw-bold">Nome: </label>
                <div className="form-group col-md-11">
                    <input type="text" id="nome" name="nome" className="form-control" placeholder="Indique o nome do utilizador..." defaultValue={listaDados.nome}  />
                    
                </div>
            </div>

            <div className="form-group row py-2">
                <label htmlFor="inputMorada" className="col-md-1 text-end fw-bold">Username: </label>
                <div className="form-group col-md-11">
                    <input type="text" id="username" name="username" placeholder="Indique o username..." className="form-control" defaultValue={listaDados.username} />
                    
                </div>
            </div>

            <div className="form-group row py-2">
                <label htmlFor="inputTelefone" className="col-md-1 text-end fw-bold">Password: </label>
                <div className="form-group col-md-11">
                    <input type="text" id="password" name="password" placeholder="Indique a password..." className="form-control" defaultValue={listaDados.password} />
                </div>
            </div>

            <div className="form-group row py-2">
                <label htmlFor="inputTelefone" className="col-md-1 text-end fw-bold">Cargo: </label>
                <div className="form-group col-md-11">
                    <input type="text" id="cargo" name="cargo" placeholder="Indique o cargo..." className="form-control" defaultValue={listaDados.cargo}/>
                </div>
            </div>

            <div className="form-group row py-2">
                <label htmlFor="inputTelefone" className="col-md-1 text-end fw-bold">Morada: </label>
                <div className="form-group col-md-11">
                    <input type="text" id="morada" name="morada" placeholder="Indique a morada..." className="form-control" defaultValue={listaDados.morada} />
                </div>
            </div>

            <div className="form-group row py-2">
                <label htmlFor="inputTelefone" className="col-md-1 text-end fw-bold">Contacto: </label>
                <div className="form-group col-md-11">
                    <input type="text" id="contacto" name="contacto" placeholder="Indique o contacto..." className="form-control" defaultValue={listaDados.contato} />
                </div>
            </div>
            <div className="form-group py-2 text-center">
                <button type="submit" className="btn btn-primary">Editar utilizador</button>
            </div>
        </form>

</div>
    </>

}