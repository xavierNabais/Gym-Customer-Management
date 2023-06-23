import React, { useState } from "react";

import axios from 'axios';

export default function FormComponent() {

    const [nome, setNome] = useState('');

    const [estado, setEstado] = useState('');

    const [musculo, setMusculo] = useState('');

    const [message, setMessage] = useState('');

    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();
        if (nome === '') {
            setMessage("É necessário inserir o nome do equipamento!")
        } else if (estado === '') {
            setMessage("É necessário inserir o estado do equipamento!")
        } else if (musculo === '') {
            setMessage("É necessário inserir o músculo do equipamento")
        } else {
            const datapost = {
                nome: nome,
                estado: estado,
                musculo: musculo,
            };
            axios
                .post("http://localhost:5000/equipamento/", datapost)
                .then((response) => {
                    if (response.status === 201) {
                        setMessage('Equipamento criado com sucesso!');
                        setIsSuccess(true);
                        setTimeout(() => {
                            window.location.href='/equipamento';
                        }, 1000);
                    }
                })
                .catch(error => {
                    setMessage('Equipamento existente!');
                    setIsSuccess(false);
                  });
        }
    }

    return <>
        <div className="container rounded shadow p-4">
            <h5 className="mb-0">Adicionar um novo equipamento</h5>
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
                    <input type="text" id="nome" name="nome" className="form-control" placeholder="Indique o nome do equipamento..." value={nome} onChange={(value) => setNome(value.target.value)} />

                </div>
            </div>

            <div className="form-group row py-2">
                <label htmlFor="inputMorada" className="col-md-1 text-end fw-bold">Estado: </label>
                <div className="form-group col-md-11">
                    <input type="number" id="estado" name="estado" placeholder="Indique o estado do equipamento..." className="form-control" value={estado} onChange={(value) => setEstado(value.target.value)} />

                </div>
            </div>

            <div className="form-group row py-2">
                <label htmlFor="inputTelefone" className="col-md-1 text-end fw-bold">Músculo: </label>
                <div className="form-group col-md-11">
                    <input type="text" id="musculo" name="musculo" placeholder="Indique o músculo..." className="form-control" value={musculo} onChange={(value) => setMusculo(value.target.value)} />

                </div>
            </div>

            <div className="form-group py-2 text-center">
                <button type="submit" className="btn btn-primary">Criar equipamento</button>
            </div>

        </form>

</div>
    </>


}