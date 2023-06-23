import React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { useLocation } from 'react-router-dom';


function Nav() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username');

  return (




<nav className="navbar navbar-expand-md bg-light navbar-light">
  <div className="container" style={{ maxWidth: "70%" , display: "block"}}>
    <div className="row">
      <div className="col-12">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <NavLink to="/" className="navbar-brand">
              Logo
            </NavLink>
          </div>
          <div className="ml-auto">
          {username ? `Olá, ${username}!` : 'Bem-vindo!'}
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/Utilizador" className="nav-link" activeClassName="active">
                Utilizadores
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/plano" className="nav-link" activeClassName="active">
                Planos de Treino
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/equipamento" className="nav-link" activeClassName="active">
                Equipamento
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/exercicio" className="nav-link" activeClassName="active">
                Exercícios
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</nav>





  );
}

export default Nav;