import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';



function Login() {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleLogin = () => {
        
        const newUser = {
            username: username,
            password: password,
          };
        if (username === '') {
        setMessage('É necessário inserir o username!');
        } else if (password === '') {
        setMessage('É necessário inserir a password!');
        }
    
    else{
        axios
        .post('http://localhost:5000/utilizadores/login', newUser)
        .then(response => {
            setMessage('Login com sucesso!');
            setIsSuccess(true);
            setTimeout(() => {
            window.location.href='/?username='+username;
            }, 1000);    
            })
        .catch(error => {
            setMessage('Username ou password incorretos!');
            setIsSuccess(false);
            setTimeout(() => {
            window.location.reload();
            }, 1000);
        });
        };
    }



        return <>

                <div className="container rounded shadow p-4">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-md-9 col-lg-6 col-xl-5">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        class="img-fluid" alt="Sample"/>
                    </div>
                    
                    <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form>


                        <div class="form-outline mb-4">
                            <label class="form-label" for="form3Example3">Username</label>
                            <input type="username" id="form3Example3" class="form-control form-control-lg"
                            placeholder="Insira o username" onChange={e => setUsername(e.target.value)}
                            />
                        </div>

                        <div class="form-outline mb-3">
                            <label class="form-label" for="form3Example4">Password</label>
                            <input type="password" id="form3Example4" class="form-control form-control-lg"
                            placeholder="Insira a password" onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <div class="d-flex justify-content-between align-items-center">
                            <div class="form-check mb-0">
                            <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                            <label class="form-check-label" for="form2Example3">
                                Lembrar-me
                            </label>
                            </div>
                            <a href="#!" class="text-body">Esqueceu a password?</a>
                        </div>

                        <div class="text-center text-lg-start mt-4 pt-2">
                            <button type="button" class="btn btn-primary "
                            style={{paddingLeft:'2.5rem', paddingRight:'2.5rem'}}  onClick={handleLogin}>Login</button>
                            <p class="small fw-bold mt-2 pt-1 mb-0">Não tem uma conta? <a href="/signup"
                                class="link-danger">Registar</a></p>
                        </div>


                        {message && (
                        <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`}>
                            {message}
                        </div>
                        )}  



                        </form>
                    </div>
                    </div>
                </div>
        </>
}

export default Login;