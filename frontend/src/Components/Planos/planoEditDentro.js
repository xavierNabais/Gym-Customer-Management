import { Link } from "react-router-dom";

import React, { useEffect, useState } from "react";

import axios from 'axios';

export default function ListComponent() {

    const [listaAlunos, setListaAlunos] = useState([]);



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
        axios.delete("http://localhost:5000/planos/apagar/"+id)
        alert('Plano de treino eliminado com sucesso!');
    }
    
    return <>
        <Link className="btn btn-success" to="/plano/add">Adicionar plano</Link>
        <table className="table table-hover table-striped">
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
                <button className="btn btn-outline-info"> <a href={'/plano/edit/'+data.plano_id} >Editar</a></button>
                <button className="btn btn-outline-danger" onClick={()=>deleteRegister(data.plano_id)}>Apagar</button>
            </td>
            </tr>
            </>
    })
}

};

