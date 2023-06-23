import React, { useState } from "react";
import '../../App.css';
import axios from 'axios';

function AddUser() {

    const [nome, setNome] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cargo, setCargo] = useState('');
    const [morada, setMorada] = useState('');
    const [contacto, setContacto] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = event => {
      event.preventDefault();
  
      if (nome === '') {
        setMessage('É necessário inserir o nome do utilizador!');
      } else if (username === '') {
        setMessage('É necessário inserir o username do utilizador!');
      } else if (password === '') {
        setMessage('É necessário inserir a password do utilizador!');
      } else if (cargo === '') {
        setMessage('É necessário inserir o cargo!');
      } else if (morada === '') {
        setMessage('É necessário inserir a morada!');
      } else if (contacto === '') {
        setMessage('É necessário inserir o contacto!');
      } else {
        const datapost = {
          nome: nome,
          username: username,
          password: password,
          cargo: cargo,
          morada: morada,
          contato: contacto,
        };
  
        axios
          .post("http://localhost:5000/utilizadores/", datapost)
          .then(response => {
            if (response.status === 201) {
              setMessage('Utilizador criado com sucesso!');
              setIsSuccess(true);
              setTimeout(() => {
                window.location.href='/utilizador/';
            }, 1000);
            }
          })
          .catch(error => {
            setMessage('Utilizador existente!');
            setIsSuccess(false);
          });
      }
    };
  
    return (
      <>
        <div className="container rounded shadow p-4">
          <h5 className="mb-0">Adicionar um novo utilizador</h5>
          <hr />

        {message && (
          <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`}>
            {message}
          </div>
        )}  


          <form onSubmit={handleSubmit}>

            <div className="form-group row py-2">
                <label htmlFor="inputNome" className="col-md-1 text-end fw-bold">Nome: </label>
                <div className="form-group col-md-11">
                    <input type="text" id="nome" name="nome" className="form-control" placeholder="Indique o nome do utilizador..." value={nome} onChange={(value) => setNome(value.target.value)}  />
                    
                </div>
            </div>

            <div className="form-group row py-2">
                <label htmlFor="inputMorada" className="col-md-1 text-end fw-bold">Username: </label>
                <div className="form-group col-md-11">
                    <input type="text" id="username" name="username" placeholder="Indique o username..." className="form-control" value={username} onChange={(value) => setUsername(value.target.value)} />
                    
                </div>
            </div>

            <div className="form-group row py-2">
                <label htmlFor="inputTelefone" className="col-md-1 text-end fw-bold">Password: </label>
                <div className="form-group col-md-11">
                    <input type="text" id="password" name="password" placeholder="Indique a password..." className="form-control" value={password} onChange={(value) => setPassword(value.target.value)} />
                </div>
            </div>

            <div className="form-group row py-2">
                <label htmlFor="inputTelefone" className="col-md-1 text-end fw-bold">Cargo: </label>
                <div className="form-group col-md-11">
                    <input type="text" id="cargo" name="cargo" placeholder="Indique o cargo..." className="form-control" value={cargo} onChange={(value) => setCargo(value.target.value)} />
                </div>
            </div>

            <div className="form-group row py-2">
                <label htmlFor="inputTelefone" className="col-md-1 text-end fw-bold">Morada: </label>
                <div className="form-group col-md-11">
                    <input type="text" id="morada" name="morada" placeholder="Indique a morada..." className="form-control" value={morada} onChange={(value) => setMorada(value.target.value)} />
                </div>
            </div>

            <div className="form-group row py-2">
                <label htmlFor="inputTelefone" className="col-md-1 text-end fw-bold">Contacto: </label>
                <div className="form-group col-md-11">
                    <input type="text" id="contacto" name="contacto" placeholder="Indique o contacto..." className="form-control" value={contacto} onChange={(value) => setContacto(value.target.value)} />
                </div>
            </div>

            <div className="form-group py-2 text-center">
                <button type="submit" className="btn btn-primary" >Criar utilizador</button>
            </div>

        </form>
        </div>

    </>
  );
}
export default AddUser;