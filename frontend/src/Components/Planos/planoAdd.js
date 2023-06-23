import React, {useEffect, useState } from "react";

import axios from 'axios';

export default function FormComponent() {

    const [nome, setNome] = useState ('');
    const [cliente, setCliente] = useState ('');
    const [datai, setDatai] = useState ('');
    const [dataf, setDataf] = useState ('');

    const [listaAlunos, setListaAlunos] = useState([]);

    const [message, setMessage] = useState('');

    const [isSuccess, setIsSuccess] = useState(false);



    useEffect(() => {
        axios.get("http://localhost:5000/planos/form")
        .then ((res) => {
            if (res.statusText === 'OK') {
                const dados = res.data;
                console.log(dados);
                setListaAlunos(dados);
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
            if (nome === ''){
                setMessage("É necessário inserir o nome do plano de treino!")
            }else if(cliente === ''){
                setMessage("É necessário inserir o cliente!")
            }else if(datai === ''){
                setMessage("É necessário inserir a data inicial do plano de treino!")
            }
            else if(dataf === ''){
                setMessage("É necessário inserir a data final do plano de treino!")
            }else{
                const datapost = {
                    nome: nome,
                    cliente: cliente,
                    datai: datai,
                    dataf: dataf,
                };
            axios
                .post("http://localhost:5000/planos/", datapost)
                .then ((response) => {
                    if (response.status === 200) {
                        setMessage("Plano criado com sucesso!")
                        setIsSuccess(true);
                        setTimeout(() => {
                            window.location.href='/plano/create/dentro/' + response.data.data.plano_id+'_'+cliente;
                        }, 1000);
                    }else{
                        setMessage("Plano de treino existente!")
                        setIsSuccess(false);
                    }
                })
                .catch ((error) => {
                    setMessage('Plano de treino existente!');
                    setIsSuccess(false);
                });
            }
    }
    return <>
        <div className="container rounded shadow p-4">
            <h5 className="mb-0">Adicionar um novo plano de treino</h5>
            <hr/>
            {message && (
          <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`}>
            {message}
          </div>
        )} 



        <form onSubmit={handleSubmit}>

            <div className="form-group row py-2">
                <label htmlFor="inputNome" className="col-md-1 text-end fw-bold">Nome do plano: </label>
                <div className="form-group col-md-11">
                    <input type="text" id="nome" name="nome" className="form-control" placeholder="Indique o nome do plano de treino..." value={nome} onChange={(value) => setNome(value.target.value)}  />
                    
                </div>
            </div>

            <div className="form-group row py-2">
                <label htmlFor="inputMorada" className="col-md-1 text-end fw-bold">Cliente: </label>
                <div className="form-group col-md-11">
                    <select name="cliente" id="cliente" className="form-control" onChange={(value) => setCliente(value.target.value)}> 
                    <option value="Escolha um cliente" disabled selected>Escolha um cliente:</option>
                    <LoadFillData/>
                    </select>
                </div>
            </div>

            <div className="form-group row py-2">
                <label htmlFor="inputTelefone" className="col-md-1 text-end fw-bold">Data de início: </label>
                <div className="form-group col-md-11">
                    <input type="date" id="datai" name="datai" placeholder="Indique a data de início..." className="form-control" value={datai} onChange={(value) => setDatai(value.target.value)} />
                </div>
            </div>

            <div className="form-group row py-2">
                <label htmlFor="inputTelefone" className="col-md-1 text-end fw-bold">Data de fim: </label>
                <div className="form-group col-md-11">
                    <input type="date" id="dataf" name="dataf" placeholder="Indique a data final..." className="form-control" value={dataf} onChange={(value) => setDataf(value.target.value)} />
                </div>
            </div>

            <div className="form-group py-2 text-center">
                <button type="submit" className="btn btn-primary">Criar plano de treino</button>
            </div>

        </form>

</div>
    </>


    function LoadFillData() {
        return listaAlunos.map((data, ) => {
            return <>
                <option value={data.utilizador_id}>{data.nome}</option>
                </>
        })
    }
}