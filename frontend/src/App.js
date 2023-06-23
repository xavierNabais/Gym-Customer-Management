import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/home';
import Login from './Components/login';
import Registo from './Components/signup';
import Utilizador from './Components//Utilizadores/utilizador';
import UtilizadorAdd from './Components//Utilizadores/UtilizadorAdd';
import UtilizadorEdit from './Components//Utilizadores/UtilizadorEdit';
import Plano from './Components/Planos/plano';
import PlanoAdd from './Components/Planos/planoAdd';
import PlanoEdit from './Components/Planos/planoEdit';
import PlanoVisualizar from './Components/Planos/planoVisualizar';
import PlanoAddDentro from './Components/Planos/planoAddDentro';
import PlanoEditDentro from './Components/Planos/planoEditDentro';
import Equipamento from './Components/Equipamento/equipamento';
import EquipamentoAdd from './Components/Equipamento/EquipamentoAdd';
import EquipamentoEdit from './Components/Equipamento/EquipamentoEdit';
import Exercicio from './Components/Exercicio/exercicio';
import ExercicioAdd from './Components/Exercicio/ExercicioAdd';
import ExercicioEdit from './Components/Exercicio/ExercicioEdit';
import Nav from './Components/Nav';
import Footer from './Components/Footer';

function App() {


  
  return (


    <Router>
      <div className='App'>
        <Nav />


            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Registo />} />
              <Route path='/utilizador' element={<Utilizador />} />
              <Route path='/utilizador/add' element={<UtilizadorAdd />} />
              <Route path='/utilizador/edit/:id' element={<UtilizadorEdit />} />

              <Route path='/plano' element={<Plano />} />
              <Route path='/plano/add' element={<PlanoAdd />} />
              <Route path='/plano/edit/:id' element={<PlanoEdit />} />

              <Route path='/plano/visualizar/:id' element={<PlanoVisualizar />} />
              <Route path='/plano/create/dentro/:id' element={<PlanoAddDentro />} />
              <Route path='/plano/edit/dentro/' element={<PlanoEditDentro />} />


              <Route path='/exercicio' element={<Exercicio />} />
              <Route path='/exercicio/add' element={<ExercicioAdd />} />
              <Route path='/exercicio/edit/:id' element={<ExercicioEdit />} />


              <Route path='/equipamento' element={<Equipamento />} />
              <Route path='/equipamento/add' element={<EquipamentoAdd />} />
              <Route path='/equipamento/edit/:id' element={<EquipamentoEdit />} />
            </Routes>

      </div>
    </Router>
  );
}

export default App;
