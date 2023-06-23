import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function EditComponent() {

    const { id } = useParams();

    const [listaDados, setListaDados] = useState([]);

    const [message, setMessage] = useState('');

    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:5000/planos/edit/"+id)
        .then ((res) => {
            if (res.statusText === 'OK') {
                const dados = res.data[0];
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
        const nome = event.target.nome.value;
        const datai = event.target.p_datai.value;
        const dataf = event.target.p_dataf.value;
        const datapost = {nome,datai,dataf};
        axios
            .put("http://localhost:5000/planos/"+id, datapost)
            .then ((response) => {
                if (response.status === 200) {
                    setMessage('Plano editado com sucesso!');
                    setIsSuccess(true);
                    setTimeout(() => {
                        window.location.href='/plano/';
                    }, 1000);
                }else{
                    setMessage('O plano não foi editado.');
                    setIsSuccess(false);           
                }
            })
            .catch ((error) => {
                setMessage('O plano não foi editado.');
                setIsSuccess(false);           

            });


    }

    return <>
            <div className="container rounded shadow p-4">
                    <h5 className="mb-0">Editar Plano de treino</h5>
            <hr/>

            {message && (
          <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`}>
            {message}
          </div>
        )} 


        <form onSubmit={handleSubmit}>
        <div className="form-group row py-2">
                <label htmlFor="inputNome" className="col-md-1 text-end fw-bold">Nome :</label>
                <div className="form-group col-md-11">
                    <input type="text" id="nome" name="nome" className="form-control" placeholder="Indique o nome do plano de treino..." defaultValue={listaDados.p_nome}  />
                    
                </div>
            </div>

            <div className="form-group row py-2">
                <label htmlFor="inputMorada" className="col-md-1 text-end fw-bold">Data Início: </label>
                <div className="form-group col-md-11">
                    <input type="date" id="p_datai" name="p_datai" placeholder="Indique a data de início..." className="form-control" defaultValue={listaDados.p_datai} />
                    
                </div>
            </div>

            <div className="form-group row py-2">
                <label htmlFor="inputTelefone" className="col-md-1 text-end fw-bold">Data Fim: </label>
                <div className="form-group col-md-11">
                    <input type="date" id="p_dataf" name="p_dataf" placeholder="Indique a data final..." className="form-control" defaultValue={listaDados.p_dataf} />
                </div>
            </div>

            <div className="form-group py-2 text-center">
                <button type="submit" className="btn btn-lg btn-primary">Editar plano de treino</button>
            </div>
        </form>
</div>

    </>

}