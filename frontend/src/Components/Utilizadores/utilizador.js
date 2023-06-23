import { Link } from "react-router-dom";

import React, { useEffect, useState } from "react";

import axios from 'axios';

export default function ListComponent() {

    const [listaDados, setListaDados] = useState([]);

    const [message, setMessage] = useState('');

    const [isSuccess, setIsSuccess] = useState(false);


    useEffect(() => {
        axios.get("http://localhost:5000/utilizadores")
            .then((res) => {
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

    const deleteRegister = (id) => {
        axios.delete("http://localhost:5000/utilizadores/" + id)
        setMessage('Utilizador apagado com sucesso!');
        setIsSuccess(true);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
    return <>

    <div className="container rounded shadow p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="mb-0">Lista de Utilizadores</h5>
            <Link className="btn btn-primary" to="/utilizador/add">Adicionar Utilizador +</Link>
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
                <th>#</th>
                <th>Nome</th>
                <th>Username</th>
                <th>Password</th>
                <th>Cargo</th>
                <th>Morada</th>
                <th>Contacto</th>
                <th align="center">Ações</th>
                </tr>
            </thead>
            <tbody>
                <LoadFillData />
            </tbody>
            </table>
        </div>
    </div>



    </>

    function LoadFillData() {
        return listaDados.map((data, index) => {
            return <>
                <tr key={index}>
                    <td>{data.utilizador_id}</td>
                    <td>{data.nome}</td>
                    <td>{data.username}</td>
                    <td>{data.password}</td>
                    <td>{data.cargo}</td>
                    <td>{data.morada}</td>
                    <td>{data.contato}</td>
                    <td>
                        <button className="btn btn-info" ><a href={'/utilizador/edit/' + data.utilizador_id} > Editar</a></button>
                        <button className="btn btn-danger" onClick={() => deleteRegister(data.utilizador_id)}>Apagar</button>
                    </td>
                </tr>
            </>
        })
    }

};

