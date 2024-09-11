import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Entes from './components/Entes.jsx'
import Rol from './components/Rol.jsx';
import Usuarios from './components/Usuarios.jsx';
import Evaluacion from './components/Evaluacion';
import Version from './components/Version.jsx';
import Pregunta from './components/Pregunta.jsx';
import Resultado from './components/Resultado.jsx'
import Aspecto from './components/Aspecto.jsx'
import Estado from './components/Estado.jsx';

const App = () => {

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="/">Gestión del Sistema</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              {/* Dropdown para Entes */}
              <li className="nav-item">
                <Link className="nav-link text-white" to="/entes">Entes</Link>
              </li>
              {/* Dropdown para Roles */}
              <li className="nav-item">
                <Link className="nav-link text-white" to="/roles">Roles</Link>
              </li>

              {/* Dropdown para Usuarios */}
              <li className="nav-item">
                <Link className="nav-link text-white" to="/usuarios">Ususarios</Link>
              </li>

              {/* Enlace para Evaluaciones */}
              <li className="nav-item">
                <Link className="nav-link text-white" to="/evaluacion">Evaluaciones</Link>
              </li>

              {/* Enlace para Version */}
              <li className="nav-item">
                <Link className="nav-link text-white" to="/version">Versión</Link>
              </li>

              {/* Enlace para Pregunta */}
              <li className="nav-item">
                <Link className="nav-link text-white" to="/pregunta">Pregunta</Link>
              </li>
              {/* Enlace para Resultado */}
              <li className="nav-item">
                <Link className="nav-link text-white" to="/resultado">Resultado</Link>
              </li>
              {/* Enlace para Aspecto */}
              <li className="nav-item">
                <Link className="nav-link text-white" to="/aspecto">Aspecto</Link>
              </li>
              {/* Enlace para Aspecto */}
              <li className="nav-item">
                <Link className="nav-link text-white" to="/estado">Estado</Link>
              </li>


            </ul>
          </div>
        </div>
      </nav>

      <main class=" container mt-5">
        <div className="container mt-4">
          <div className="row text-center">
            <div className="col-md-12">
              <h1 className="display-4">Bienvenido al Sistema de Auditoría</h1>
              <p className="lead">
                Este software está diseñado para la gestión eficiente y segura de datos sensibles.
                Proporciona herramientas para la auditoría, el control y la administración de la información.
              </p>
              <p>
                Navegue a través de las secciones a continuación para gestionar entes, roles, usuarios y evaluaciones.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Routes>
        <Route path="/entes" element={<Entes />} />
        <Route path="/roles" element={<Rol />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/evaluacion" element={<Evaluacion />} />
        <Route path="/version" element={<Version />} />
        <Route path="/pregunta" element={<Pregunta />} />
        <Route path="/resultado" element={<Resultado />} />
        <Route path="/aspecto" element={<Aspecto />} />
        <Route path="/estado" element={<Estado />} />
      </Routes>
    </Router>
  );
};

export default App;
