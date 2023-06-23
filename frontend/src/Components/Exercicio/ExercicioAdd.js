import React, {useEffect,useState } from "react";

import axios from 'axios';

export default function FormComponent() {

    const [nome, setNome] = useState ('');

    const [equipamento, setEquipamento] = useState ('');

    const [musculo, setMusculo] = useState ('');

    const [listaAlunos, setListaAlunos] = useState([]);

    const [message, setMessage] = useState('');

    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:5000/exercicios/form")
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
                setMessage("É necessário inserir o nome do exercício!")
            }else if(equipamento === ''){
                setMessage("É necessário inserir o equipamento!")
            }else if(musculo === ''){
                setMessage("É necessário inserir o músculo do exercício")
            }else{
                console.log('tetse');
                const datapost = {
                    nome: nome,
                    equipamento: equipamento,
                    musculo: musculo
                };
            axios
                .post("http://localhost:5000/exercicios", datapost)
                .then ((response) => {
                    if (response.status === 201) {
                        setMessage('Exercício criado com sucesso!');
                        setIsSuccess(true);
                        setTimeout(() => {
                            window.location.href='/exercicio';
                        }, 1000);
                      }
                })
                .catch(error => {
                    setMessage('Exercício existente!');
                    setIsSuccess(false);
                  });
            }
    }


    return <>
            <div className="container rounded shadow p-4">
                    <h5 className="mb-0">Adicionar um novo exercício</h5>
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
                    <input type="text" id="nome" name="nome" className="form-control" placeholder="Indique o nome do exercício..." value={nome} onChange={(value) => setNome(value.target.value)}  />
                    
                </div>
            </div>

            <div className="form-group row py-2">
                <label htmlFor="inputMorada" className="col-md-1 text-end fw-bold">Equipamento: </label>
                <div className="form-group col-md-11">
                    <select name="equipamento" id="equipamento" className="form-control" onChange={(value) => setEquipamento(value.target.value)}> 
                    <option value="Escolha um cliente" disabled selected>Escolha um equipamento:</option>
                    <LoadFillData/>
                    </select>
                </div>
            </div>

            <div className="form-group row py-2">
                <label htmlFor="inputTelefone" className="col-md-1 text-end fw-bold">Músculo: </label>
                <div className="form-group col-md-11">
                    <input type="text" id="musculo" name="musculo" placeholder="Indique o músculo..." className="form-control" value={musculo} onChange={(value) => setMusculo(value.target.value)} />
                </div>
            </div>

            <div className="form-group py-2 text-center">
                <button type="submit" className="btn btn-primary">Criar exercício</button>
            </div>

        </form>
    </div>

    </>


    function LoadFillData() {
        return listaAlunos.map((data, ) => {
            return <>
                <option value={data.nome}>{data.nome}</option>
                </>
        })
    }

}