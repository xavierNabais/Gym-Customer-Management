import { Link } from "react-router-dom";

import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import axios from 'axios';

export default function ListComponent() {

    const [listaAlunos, setListaAlunos] = useState([]);

    const { id } = useParams();

    const [message, setMessage] = useState('');

    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:5000/planos/visualizar/"+id)
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
        axios.delete("http://localhost:5000/planosDentro/"+id)
        setMessage('Exercício eliminado com sucesso!');
        setIsSuccess(true);
        setTimeout(() => {
            window.location.reload();
        }, 1000);

    }
    
    return <>
        <div className="container rounded shadow p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Lista de Exercícios do Plano</h5>
                <Link className="btn btn-primary" to={`/plano/create/dentro/${id}`}>Adicionar Exercício +</Link>
            </div>

            {message && (
          <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`}>
            {message}
          </div>
        )} 

<div className="table-responsive table-wrapper-scroll-y my-custom-scrollbar">

        <table className="table table-hover">
            <thead className="thead-dark">
                <tr>
                    <th scrope="col">Exercício</th>
                    <th scrope="col">Equipamento</th>
                    <th scrope="col">Repetições</th>
                    <th scrope="col">Carga</th>
                    <th scrope="col">Intervalo</th>
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
            <td>{data.exerc_nome}</td>
            <td>{data.equip_nome}</td>
            <td>{data.repeticoes}</td>
            <td>{data.carga}</td>
            <td>{data.intervalo}</td>
            <td>
                <button className="btn btn-danger" onClick={()=>deleteRegister(data.id_line)}>Apagar</button>
            </td>
            </tr>
            </>
    })
}

};

