import { Link } from "react-router-dom";

import React, { useEffect, useState } from "react";

import axios from 'axios';

export default function ListComponent() {

    const [listaAlunos, setListaAlunos] = useState([]);


    const [message, setMessage] = useState('');

    const [isSuccess, setIsSuccess] = useState(false);


    useEffect(() => {
        axios.get("http://localhost:5000/exercicios")
        .then ((res) => {
            if (res.statusText === 'OK') {
                const dados = res.data;
                setListaAlunos(dados);
                console.log(res.data);
            } else {
                alert("Erro na ligação à API!");
            }
        })
        

        .catch((error) => {
            alert(error);
        });
    }, []);

    const deleteRegister = (id) => {
        console.log('teste');
        axios.delete("http://localhost:5000/exercicios/"+id)
        setMessage('Exercício apagado com sucesso!');
        setIsSuccess(true);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    return <>
            <div className="container rounded shadow p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Lista de Exercícios</h5>
                <Link className="btn btn-primary" to="/exercicio/add">Adicionar Exercício +</Link>
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
                    <th scrope="col">Nome</th>
                    <th scrope="col">Equipamento</th>
                    <th scrope="col">Músculo</th>
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
            <td>{data.id_exercicio}</td>
            <td>{data.nome}</td>
            <td>{data.equipamento}</td>
            <td>{data.musculo}</td>
            <td>
                <button className="btn btn-info"><a href={'/exercicio/edit/'+data.id_exercicio} > Editar</a></button>
                <button className="btn btn-danger" onClick={()=>deleteRegister(data.id_exercicio)}>Apagar</button>
            </td>
            </tr>
            </>
    })
}

};

