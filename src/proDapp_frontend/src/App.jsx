import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importamos el JS de Bootstrap
import CreateEnte from './components/CreateEnte';
import QueryEnte from './components/QueryEnte';
import UpdateEnte from './components/UpdateEnte';
import DeleteEnte from './components/DeleteEnte';
import CreateRol from './components/CreateRol';
import DeleteRol from './components/DeleteRol';
import QueryRol from './components/QueryRol';
import UpdateRol from './components/UpdateRol';
import { entes } from '../../declarations/entes/index.js';
import { roles } from '../../declarations/roles/index.js'; // Asumiendo que existe una declaración para roles

const App = () => {
  const createEnte = async (idEnte, datos) => {
    try {
      return await entes.newEnte(idEnte, datos);
    } catch (error) {
      console.error('Error al crear el ente:', error);
      throw error;
    }
  };

  const getEnte = async (idEnte) => {
    try {
      return await entes.getEnte(idEnte);
    } catch (error) {
      console.error('Error al consultar el ente:', error);
      throw error;
    }
  };

  const updateEnte = async (idEnte, datos) => {
    try {
      return await entes.updateEnte(idEnte, datos);
    } catch (error) {
      console.error('Error al actualizar el ente:', error);
      throw error;
    }
  };

  const deleteEnte = async (idEnte) => {
    try {
      const response = await entes.deleteEnte(idEnte);
      return response;
    } catch (error) {
      console.error('Error al eliminar el ente:', error);
      throw error;
    }
  };

  const createRol = async (idRol, datos) => {
    try {
      return await roles.newRol(idRol, datos);
    } catch (error) {
      console.error('Error al crear el rol:', error);
      throw error;
    }
  };

  const getRol = async (idRol) => {
    try {
      return await roles.getIdRol(idRol);
    } catch (error) {
      console.error('Error al consultar el rol:', error);
      throw error;
    }
  };

  const updateRol = async (idRol, datos) => {
    try {
      return await roles.updateRol(idRol, datos);
    } catch (error) {
      console.error('Error al actualizar el rol:', error);
      throw error;
    }
  };

  const deleteRol = async (idRol) => {
    try {
      const response = await roles.deleteRol(idRol);
      return response;
    } catch (error) {
      console.error('Error al eliminar el rol:', error);
      throw error;
    }
  };

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
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-white" href="/" id="entesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Entes
                </a>
                <ul className="dropdown-menu" aria-labelledby="entesDropdown">
                  <li><Link className="dropdown-item" to="/createEnte">Crear Ente</Link></li>
                  <li><Link className="dropdown-item" to="/queryEnte">Consultar Ente</Link></li>
                  <li><Link className="dropdown-item" to="/updateEnte">Actualizar Ente</Link></li>
                  <li><Link className="dropdown-item" to="/deleteEnte">Eliminar Ente</Link></li>
                </ul>
              </li>

              {/* Dropdown para Roles */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-white" href="/" id="rolesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Roles
                </a>
                <ul className="dropdown-menu" aria-labelledby="rolesDropdown">
                  <li><Link className="dropdown-item" to="/createRol">Crear Rol</Link></li>
                  <li><Link className="dropdown-item" to="/queryRol">Consultar Rol</Link></li>
                  <li><Link className="dropdown-item" to="/updateRol">Actualizar Rol</Link></li>
                  <li><Link className="dropdown-item" to="/deleteRol">Eliminar Rol</Link></li>
                </ul>
              </li>

              {/* Dropdown para Usuarios */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-white" href="/" id="usuariosDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Usuarios
                </a>
                <ul className="dropdown-menu" aria-labelledby="usuariosDropdown">
                  <li><Link className="dropdown-item" to="/createUser">Crear Usuario</Link></li>
                  <li><Link className="dropdown-item" to="/queryUser">Consultar Usuario</Link></li>
                  <li><Link className="dropdown-item" to="/deleteUser">Eliminar Usuario</Link></li>
                </ul>
              </li>

            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/createEnte" element={<CreateEnte createEnte={createEnte} />} />
        <Route path="/queryEnte" element={<QueryEnte getEnte={getEnte} />} />
        <Route path="/updateEnte" element={<UpdateEnte updateEnte={updateEnte} />} />
        <Route path="/deleteEnte" element={<DeleteEnte deleteEnte={deleteEnte} />} />
        <Route path="/createRol" element={<CreateRol createRol={createRol} />} />
        <Route path="/queryRol" element={<QueryRol getRol={getRol} />} />
        <Route path="/updateRol" element={<UpdateRol updateRol={updateRol} />} />
        <Route path="/deleteRol" element={<DeleteRol deleteRol={deleteRol} />} />
      </Routes>
    </Router>
  );
};

export default App;
