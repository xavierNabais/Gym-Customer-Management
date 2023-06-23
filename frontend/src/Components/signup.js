import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';

function Signup() {

  const [termosAceites, setTermosAceites] = useState(false);


  const [nome, setNome] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [morada, setMorada] = useState('');
  const [contato, setContato] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleSignup = () => {
    const newUser = {
      nome: nome,
      username: username,
      password: password,
      cargo: 'Funcionário',
      morada: morada,
      contato: contato,
    };

    if (nome === '') {
      setMessage('É necessário inserir o nome do utilizador!');
    } else if (username === '') {
      setMessage('É necessário inserir o username do utilizador!');
    } else if (password === '') {
      setMessage('É necessário inserir a password do utilizador!');
    } else if (morada === '') {
      setMessage('É necessário inserir a morada!');
    } else if (contato === '') {
      setMessage('É necessário inserir o contacto!');
    } else if (!termosAceites) {
      setMessage('É necessário aceitar os termos e condições!')
    }
  
   else{

    axios
      .post('http://localhost:5000/utilizadores/', newUser)
      .then(response => {
        setMessage('Funcionário adicionado com sucesso!');
        setIsSuccess(true);
        setTimeout(() => {
          window.location.href='/login';
        }, 1000);    
        })
      .catch(error => {
        console.error(error);
        // Aqui você pode tratar o erro, como exibir uma mensagem de erro
      });
    };
  }

  const handleCheckboxChange = (event) => {
    setTermosAceites(event.target.checked);
  };


  return (
    <>
      <div className="container rounded shadow p-4">
        <div className="col-lg-12 col-xl-11">
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="img-fluid"
                  alt="Sample"
                />
              </div>
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Registar</p>

                <form className="mx-1 mx-md-4">
                  <div className="d-flex flex-row align-items-center mb-4">
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label" htmlFor="nome">Nome</label>
                      <input
                        type="text"
                        id="nome"
                        className="form-control"
                        placeholder="Insira o nome"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label" htmlFor="username">Nome de utilizador</label>
                      <input
                        type="text"
                        id="username"
                        className="form-control"
                        placeholder="Insira o nome de utilizador"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label" htmlFor="password">Senha</label>
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Insira a senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label" htmlFor="morada">Morada</label>
                      <input
                        type="text"
                        id="morada"
                        className="form-control"
                        placeholder="Insira a morada"
                        value={morada}
                        onChange={e => setMorada(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label" htmlFor="contato">Contato</label>
                      <input
                        type="text"
                        id="contato"
                        className="form-control"
                        placeholder="Insira o contato"
                        value={contato}
                        onChange={e => setContato(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-check d-flex justify-content-center mb-5">
                  <input
                  className="form-check-input me-2"
                  type="checkbox"
                  checked={termosAceites}
                  onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label" htmlFor="form2Example3">
                      Aceito os <a href="#!">termos de serviço</a>
                    </label>
                  </div>

                  {message && (
                  <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`}>
                    {message}
                  </div>
                  )}  

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" className="btn btn-primary btn-lg" onClick={handleSignup}>
                      Registar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
