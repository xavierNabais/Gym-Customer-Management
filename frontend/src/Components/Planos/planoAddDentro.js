import React, {useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function FormComponent() {

    const [repeticoes, setRepeticoes] = useState ('');

    const [equipamento, setEquipamento] = useState ('');

    const [exercicio, setExercicio] = useState ('');

    const [carga, setCarga] = useState ('');

    const [intervalo, setIntervalo] = useState ('');

    const [listaEquipamento, setListaEquipamento] = useState([]);

    const [listaExercicio, setListaExercicios] = useState([]);

    const [message, setMessage] = useState('');

    const [isSuccess, setIsSuccess] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        axios.get("http://localhost:5000/planos/getValuesEq")
        .then ((res) => {
            if (res.statusText === 'OK') {
                const dados = res.data;
                console.log(dados);
                setListaEquipamento(dados);
            } else {
                alert("Erro na ligação à API!");
            }
        })
        

        .catch((error) => {
            alert(error);
        });
    }, []);

    useEffect(() => {
        axios.get("http://localhost:5000/planos/getValuesEx")
        .then ((res) => {
            if (res.statusText === 'OK') {
                const dados = res.data;
                console.log(dados);
                setListaExercicios(dados);
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
                event.preventDefault(); 
            if (exercicio === ''){
                setMessage("É necessário inserir o exercício!")
            }else if(equipamento === ''){
                setMessage("É necessário inserir o equipamento!")
            }else if(carga === ''){
                setMessage("É necessário inserir a carga do exercício")
            }else if(repeticoes === ''){
                setMessage("É necessário inserir as repetições de cada série!")
            }else if(intervalo === ''){
                setMessage("É necessário inserir o intyervalo entre séries!")
            }else{
                const datapost = {
                    equipamento: equipamento,
                    exercicio: exercicio,
                    repeticoes: repeticoes,
                    intervalo: intervalo,
                    carga: carga
                };
            axios
                .post("http://localhost:5000/planos/create/dentroplano/"+id, datapost)
                .then ((response) => {
                    if (response.status === 200) {
                        setMessage("Exercício adicionado ao plano de treino com sucesso!")
                        setIsSuccess(true);
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    }else{
                        setMessage("O exercício não foi adicionado ao plano de treino.")
                        setIsSuccess(false);
                    }
                })
                .catch ((error) => {
                    setMessage('O exercício não foi adicionado ao plano de treino!');
                    setIsSuccess(false);
                });
            }
    }

    return <>
            <div className="container rounded shadow p-4">
                    <h5 className="mb-0">Adicionar um exercício ao plano de treino</h5>
            <hr/>

            {message && (
          <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`}>
            {message}
          </div>
        )} 



        <form onSubmit={handleSubmit}>

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
                <label htmlFor="inputMorada" className="col-md-1 text-end fw-bold">Exercício: </label>
                <div className="form-group col-md-11">
                    <select name="exercicio" id="exercicio" className="form-control" onChange={(value) => setExercicio(value.target.value)}> 
                    <option value="Escolha um cliente" disabled selected>Escolha um equipamento:</option>
                    <LoadFillData2/>
                    </select>
                </div>
            </div>
            <div className="form-group row py-2">
                <label htmlFor="inputTelefone" className="col-md-1 text-end fw-bold">Repetições: </label>
                <div className="form-group col-md-11">
                    <input type="text" id="repeticoes" name="repeticoes" placeholder="Indique o músculo..." className="form-control" value={repeticoes} onChange={(value) => setRepeticoes(value.target.value)} />
                </div>
            </div>
            <div className="form-group row py-2">
                <label htmlFor="inputTelefone" className="col-md-1 text-end fw-bold">Carga: </label>
                <div className="form-group col-md-11">
                    <input type="text" id="carga" name="carga" placeholder="Indique o músculo..." className="form-control" value={carga} onChange={(value) => setCarga(value.target.value)} />
                </div>
            </div>            <div className="form-group row py-2">
                <label htmlFor="inputTelefone" className="col-md-1 text-end fw-bold">Intervalo: </label>
                <div className="form-group col-md-11">
                    <input type="text" id="intervalo" name="intervalo" placeholder="Indique o músculo..." className="form-control" value={intervalo} onChange={(value) => setIntervalo(value.target.value)} />
                </div>
            </div>
            <div className="form-group py-2 text-center">
                <button type="submit" className="btn btn-primary">Criar exercício</button>
            </div>

        </form>

</div>
    </>


    function LoadFillData() {
        return listaEquipamento.map((data, ) => {
            return <>
                <option value={data.id_equipamento}>{data.nome}</option>
                </>
        })
    }
    function LoadFillData2() {
        return listaExercicio.map((data, ) => {
            return <>
                <option value={data.id_exercicio}>{data.nome}</option>
                </>
        })
    }
}