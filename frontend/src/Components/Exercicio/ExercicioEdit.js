import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EditComponent() {

    const { id } = useParams();

    const [listaDados, setListaDados] = useState([]);

    const [message, setMessage] = useState('');

    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:5000/exercicios/editar/"+id)
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
        const equipamento = event.target.equipamento.value;
        const musculo = event.target.musculo.value;
        const datapost = {numero,nome,equipamento,musculo};
        axios
            .put("http://localhost:5000/exercicios", datapost)
            .then ((response) => {
                if (response.status === 200) {
                    setMessage('Exercício alterado com sucesso!');
                    setIsSuccess(true);
                    setTimeout(() => {
                        window.location.href='/exercicio';
                    }, 1000);
                }else{
                    setMessage('O exercício não foi alterado.');
                    setIsSuccess(false);             
                }
            })
            .catch ((error) => {
                alert('Ocorreu um erro. Por favor, tente novamente mais tarde. ["+ error +"]');
            });


    }

    return <>
            <div className="container rounded shadow p-4">
                    <h5 className="mb-0">Editar exercício</h5>
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
                    <input type="text" id="nome" name="nome" className="form-control" defaultValue={listaDados.nome} placeholder="Indique o nome do exercício..." />
                    
                </div>
            </div>

            <div className="form-group row py-2">
                <label htmlFor="inputMorada" className="col-md-1 text-end fw-bold">Equipamento: </label>
                <div className="form-group col-md-11">
                    <input type="text" id="estado" name="equipamento" placeholder="Indique o equipamento do exercício..." defaultValue={listaDados.equipamento} className="form-control" />
                    
                </div>
            </div>

            <div className="form-group row py-2">
                <label htmlFor="inputTelefone" className="col-md-1 text-end fw-bold">Músculo: </label>
                <div className="form-group col-md-11">
                    <input type="text" id="musculo" name="musculo" placeholder="Indique o músculo do exercício..." defaultValue={listaDados.musculo} className="form-control" />
                    
                </div>
            </div>

            <div className="form-group py-2 text-center">
                <button type="submit" className="btn btn-primary">Editar equipamento</button>
            </div>

        </form>
</div>

    </>

}