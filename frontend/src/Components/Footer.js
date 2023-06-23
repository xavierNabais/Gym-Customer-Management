import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 



function Footer() {
    return <>

        <footer class="w-100 py-4 flex-shrink-0" style={{backgroundColor:'#1b1c1d',bottom:'0',marginTop:'auto', position:'fixed', left:'0'}}>
        <div class="container py-4">
            <div class="row gy-4 gx-5">
            <div class="col-lg-2 col-md-6">
                    <h5 class="text-white mb-3">Utilizadores</h5>
                    <ul class="list-unstyled text-muted">
                    <Link to="/utilizador" style={{ textDecoration: 'none' }}>
                        <li className='text-white' >Visualizar</li>
                        </Link>
                        <Link to="/utilizador/add" style={{ textDecoration: 'none' }}>
                        <li className='text-white' >Adicionar novo utilizador</li>
                        </Link>
                    </ul>
                </div>
                <div class="col-lg-2 col-md-6">
                    <h5 class="text-white mb-3">Planos de treino</h5>
                    <ul class="list-unstyled text-muted">
                    <Link to="/plano" style={{ textDecoration: 'none' }}>
                        <li className='text-white' >Visualizar</li>
                        </Link>
                        <Link to="/plano/add" style={{ textDecoration: 'none' }}>
                        <li className='text-white' >Adicionar novo plano de treino</li>
                        </Link>
                    </ul>
                </div>
                <div class="col-lg-2 col-md-6">
                    <h5 class="text-white mb-3">Equipamento</h5>
                    <ul class="list-unstyled text-muted">
                    <Link to="/equipamento" style={{ textDecoration: 'none' }}>
                        <li className='text-white' >Visualizar</li>
                        </Link>
                        <Link to="/equipamento/add" style={{ textDecoration: 'none' }}>
                        <li className='text-white' >Adicionar novo equipamento</li>
                        </Link>
                    </ul>
                </div>
                <div class="col-lg-2 col-md-6">
                    <h5 class="text-white mb-3">Exercícios</h5>
                    <ul class="list-unstyled text-muted">
                        <Link to="/exercicio" style={{ textDecoration: 'none' }}>
                        <li className='text-white' >Visualizar</li>
                        </Link>
                        <Link to="/exercicio/add" style={{ textDecoration: 'none' }}>
                        <li className='text-white' >Adicionar novo exercício</li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
    </>
}

export default Footer;