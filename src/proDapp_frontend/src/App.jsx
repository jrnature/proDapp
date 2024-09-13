import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import Entes from './components/Entes.jsx';
import Rol from './components/Rol.jsx';
import Usuarios from './components/Usuarios.jsx';
import Evaluacion from './components/Evaluacion';
import Version from './components/Version.jsx';
import Pregunta from './components/Pregunta.jsx';
import Resultado from './components/Resultado.jsx';
import Aspecto from './components/Aspecto.jsx';
import Estado from './components/Estado.jsx';
import ResultadoEval from './components/ResultadoEval.jsx';
import Login from './components/Login.jsx';
import AutoEv from './components/AutoEv.jsx';
import ResultEvaluador from './components/ResultEvaluador.jsx';
import Replica from './components/Replica.jsx'; 

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="/">Gestión del Sistema</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/entes">Entes</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/roles">Roles</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/usuarios">Usuarios</Link>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Evaluación Integral
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><Link className="dropdown-item" to="/evaluacion">Evaluaciones</Link></li>
                    <li><Link className="dropdown-item" to="/version">Versión</Link></li>
                    <li><Link className="dropdown-item" to="/pregunta">Pregunta</Link></li>
                    <li><Link className="dropdown-item" to="/resultado">Resultado</Link></li>
                    <li><Link className="dropdown-item" to="/aspecto">Aspecto</Link></li>
                    <li><Link className="dropdown-item" to="/estado">Estado</Link></li>
                    <li><Link className="dropdown-item" to="/resulteval">Resultado de Evaluación</Link></li>
                    <li><Link className="dropdown-item" to="/autoev">Autoevaluación</Link></li>
                    <li><Link className="dropdown-item" to="/resultevaluador">Resultado Evaluador</Link></li>
                    <li><Link className="dropdown-item" to="/replica">Replica</Link></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger" onClick={logout}>Cerrar Sesión</button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/login">Iniciar Sesión</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="container mt-5">
          <Routes>
            <Route path="/login" element={<Login onLogin={() => {}} />} />
            <Route path="/" element={<ProtectedRoute element={<Home />} />} />
            <Route path="/entes" element={<ProtectedRoute element={<Entes />} />} />
            <Route path="/roles" element={<ProtectedRoute element={<Rol />} />} />
            <Route path="/usuarios" element={<ProtectedRoute element={<Usuarios />} />} />
            <Route path="/evaluacion" element={<ProtectedRoute element={<Evaluacion />} />} />
            <Route path="/version" element={<ProtectedRoute element={<Version />} />} />
            <Route path="/pregunta" element={<ProtectedRoute element={<Pregunta />} />} />
            <Route path="/resultado" element={<ProtectedRoute element={<Resultado />} />} />
            <Route path="/aspecto" element={<ProtectedRoute element={<Aspecto />} />} />
            <Route path="/estado" element={<ProtectedRoute element={<Estado />} />} />
            <Route path="/resulteval" element={<ProtectedRoute element={<ResultadoEval />} />} />
            <Route path="/autoev" element={<ProtectedRoute element={<AutoEv />} />} />
            <Route path="/resultevaluador" element={<ProtectedRoute element={<ResultEvaluador />} />} />
            <Route path="/replica" element={<ProtectedRoute element={<Replica />} />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
};

const Home = () => (
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
);

export default App;
