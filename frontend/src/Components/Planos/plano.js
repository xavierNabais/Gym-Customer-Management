import { Link } from "react-router-dom";

import React, { useEffect, useState } from "react";

import axios from 'axios';

export default function ListComponent() {

    const [listaAlunos, setListaAlunos] = useState([]);

    const [message, setMessage] = useState('');

    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:5000/planos")
        .then ((res) => {
            if (res.statusText === 'OK') {
                const dados = res.data;
                setListaAlunos(dados);
            } else {
                alert("Erro na ligação à API!");
            }
        })
        

        .catch((error) => {
            alert(error);
        });
    }, []);

    const deleteRegister = (id) => {
        axios.delete("http://localhost:5000/planos/"+id)
        setMessage('Plano apagado com sucesso!');
        setIsSuccess(true);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
    
    return <>
            <div className="container rounded shadow p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Lista de Planos de treino</h5>
                <Link className="btn btn-primary" to="/plano/add">Adicionar Plano de Treino +</Link>
            </div>

            {message && (
          <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`}>
            {message}
          </div>
        )} 

            
            <hr />
            <div className="table-responsive table-wrapper-scroll-y my-custom-scrollbar">

            <table className="table table-hover">
            <thead className="thead-dark">
                <tr>
                    <th scrope="col">#</th>
                    <th scrope="col">Plano de treino</th>
                    <th scrope="col">Cliente</th>
                    <th scrope="col">Data de início</th>
                    <th scrope="col">Data de fim</th>
                    <th scrope="col">Ações</th>
                </tr>
            </thead>

            <tbody>
                <LoadFillData/>
            </tbody>
        </table>
        </div>
        </div>
        
        </>

function LoadFillData() {
    return listaAlunos.map((data, index) => {
        return <>
            <tr key={index}>
            <td>{data.plano_id}</td>
            <td>{data.plano_nome}</td>
            <td>{data.nome}</td>
            <td>{data.planos_datai}</td>
            <td>{data.planos_dataf}</td>
            <td>
                <button className="btn btn-info"> <a href={'/plano/visualizar/'+data.plano_id+'_'+data.id_user} >Visualizar</a></button>
                <button className="btn btn-info"> <a href={'/plano/edit/'+data.plano_id} >Editar</a></button>
                <button className="btn btn-danger" onClick={()=>deleteRegister(data.plano_id)}>Apagar</button>
            </td>
            </tr>
            </>
    })
}

};

