import 'font-awesome/css/font-awesome.min.css';
import '../App.css';


function Home() {


    
return <>
    <div className="container rounded shadow p-4">
      <div className="row main-content">
        <div className="col-sm">
          <div className="card text-center border-0" style={{width: '18rem'}}>
          <i className="fa fa-user" style={{fontSize:'100px'}}></i>

            <div className="card-body">
              <h5 className="card-title">Utilizadores CRUD</h5>
              <p className="card-text">Gestão de utilizadores</p>
              <a href="/Utilizador" className="btn btn-primary">Visualizar</a>
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div className="card text-center border-0" style={{width: '18rem'}}>
          <i className="fa fa-braille" style={{fontSize:'100px'}}></i>
            <div className="card-body">
              <h5 className="card-title">Planos de treino CRUD</h5>
              <p className="card-text">Gestão de planos de treino</p>
              <a href="/plano" className="btn btn-primary">Visualizar</a>
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div className="card text-center border-0" style={{width: '18rem'}}>
          <i className="fa fa-bars" style={{fontSize:'100px'}}></i>
            <div className="card-body">
              <h5 className="card-title">Equipamentos CRUD</h5>
              <p className="card-text">Gestão de equipamentos</p>
              <a href="/equipamento" className="btn btn-primary">Visualizar</a>
            </div> 
          </div>
        </div>
        <div className="col-sm">
          <div className="card text-center border-0" style={{width: '18rem'}}>
          <i className="fa fa-bicycle" style={{fontSize:'100px'}}></i>
          <div className="card-body">
            <h5 className="card-title">Exercícios CRUD</h5>
            <p className="card-text">Gestão de exercícios</p>
            <a href="/exercicio" className="btn btn-primary">Visualizar</a>
          </div> 
          </div>
        </div>
      </div>
    </div>
</>


};

export default Home;