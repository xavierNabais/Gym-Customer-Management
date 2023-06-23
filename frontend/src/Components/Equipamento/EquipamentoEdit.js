import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EditComponent() {

    const { id } = useParams();

    const [listaDados, setListaDados] = useState([]);

    const [message, setMessage] = useState('');

    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:5000/equipamento/"+id)
        .then ((res) => {
            if (res.statusText === 'OK') {
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
        const numero = event.target.idequipamento.value;
        const nome = event.target.nome.value;
        const estado = event.target.estado.value;
        const musculo = event.target.musculo.value;

        const datapost = {numero,nome,estado,musculo};

        axios
            .put("http://localhost:5000/equipamento/", datapost)
            .then ((response) => {
                if (response.status === 201) {
                    setMessage('Equipamento alterado com sucesso!');
                    setIsSuccess(true);
                    setTimeout(() => {
                        window.location.href='/equipamento';
                    }, 1000);
                }else{
                    setMessage('O equipamento não foi alterado.');
                    setIsSuccess(false);
                }
            })
            .catch ((error) => {
                setMessage('O equipamento não foi alterado!');
                setIsSuccess(false);          
            });


    }

    return <>
            <div className="container rounded shadow p-4">
                    <h5 className="mb-0">Editar equipamento</h5>
            <hr/>


            {message && (
          <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`}>
            {message}
          </div>
        )}  

        <form onSubmit={handleSubmit}>
            <div className="form-group row py-2">
                <label htmlFor="idAluno" className="col-md-1 text-end fw-bold">#:</label>
                <div className="form-group col-md-11">
                    <input type="text" readOnly="readOnly" id="idequipamento" name="idequipamento" value={id} className="form-control" />

                </div>
            </div>

            <div className="form-group row py-2">
                <label htmlFor="inputNome" className="col-md-1 text-end fw-bold">Nome: </label>
                <div className="form-group col-md-11">
                    <input type="text" id="nome" name="nome" className="form-control" defaultValue={listaDados.nome} placeholder="Indique o nome do equipamento..." />
                    
                </div>
            </div>

            <div className="form-group row py-2">
                <label htmlFor="inputMorada" className="col-md-1 text-end fw-bold">Estado: </label>
                <div className="form-group col-md-11">
                    <input type="number" id="estado" name="estado" placeholder="Indique o estado do equipamento..." defaultValue={listaDados.estado} className="form-control" />
                    
                </div>
            </div>

            <div className="form-group row py-2">
                <label htmlFor="inputTelefone" className="col-md-1 text-end fw-bold">Músculo: </label>
                <div className="form-group col-md-11">
                    <input type="text" id="musculo" name="musculo" placeholder="Indique o músculo do equipamento..." defaultValue={listaDados.musculo} className="form-control" />
                    
                </div>
            </div>

            <div className="form-group py-2 text-center">
                <button type="submit" className="btn btn-primary">Editar equipamento</button>
            </div>

        </form>
</div>

    </>

}