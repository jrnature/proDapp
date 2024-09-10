import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import CreateEnte from './components/CreateEnte';
import QueryEnte from './components/QueryEnte';
import UpdateEnte from './components/UpdateEnte';
import DeleteEnte from './components/DeleteEnte';
import CreateRol from './components/CreateRol';
import DeleteRol from './components/DeleteRol';
import QueryRol from './components/QueryRol';
import UpdateRol from './components/UpdateRol';
import CreateUser from './components/CreateUser';
import QueryUser from './components/QueryUser';
import UpdateUser from './components/UpdateUSer';
import DeleteUser from './components/DeleteUser';
import Evaluacion from './components/Evaluacion';
import Version from './components/Version.jsx';
import { entes } from '../../declarations/entes/index.js';
import { roles } from '../../declarations/roles/index.js';
import { usuario } from '../../declarations/usuario/index.js';

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
      // Llamamos al método deleteUsuario del actor se cambia el estandar de ente por usuario
      await entes.deleteUsuario(idEnte);
      return true;
    } catch (error) {
      console.error('Error al eliminar el ente:', error);
      throw error; // Propagamos el error para manejarlo en el componente
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

  // Funciones para Usuarios
  const createUser = async (idUsuario, datos) => {
    try {
      return await usuario.newUsuario(idUsuario, datos);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      throw error;
    }
  };

  const getUser = async (idUsuario) => {
    try {
      return await usuario.getUsuario(idUsuario);
    } catch (error) {
      console.error('Error al consultar el usuario:', error);
      throw error;
    }
  };

  const updateUser = async (idUsuario, datos) => {
    try {
      return await usuario.updateUsuario(idUsuario, datos);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      throw error;
    }
  };

  const deleteUser = async (idUsuario) => {
    try {
      const response = await usuario.deleteUsuario(idUsuario);
      return response;
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
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
                  <li><Link className="dropdown-item" to="/updateUser">Actualizar Usuario</Link></li>
                  <li><Link className="dropdown-item" to="/deleteUser">Eliminar Usuario</Link></li>
                </ul>
              </li>

              {/* Enlace para Evaluaciones */}
              <li className="nav-item">
                <Link className="nav-link text-white" to="/evaluacion">Evaluaciones</Link>
              </li>

              {/* Enlace para Version */}
              <li className="nav-item">
                <Link className="nav-link text-white" to="/version">Versión</Link>
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
        {/* <div className="row">
          <div className="col-md-4 d-flex align-items-stretch mb-4">
            <div className="card text-center">
              <div className="card-body">
                <i className="fas fa-building fa-4x mb-3"></i>
                <h5 className="card-title">Gestión de Entes</h5>
                <p className="card-text">Crea, consulta, actualiza y elimina entes en el sistema de auditoría.</p>
                <Link to="/createEnte" className="btn btn-primary">Crear Ente</Link>
              </div>
            </div>
          </div>

          <div className="col-md-4 d-flex align-items-stretch mb-4">
            <div className="card text-center">
              <div className="card-body">
                <i className="fas fa-shield-alt fa-4x mb-3"></i>
                <h5 className="card-title">Gestión de Roles</h5>
                <p className="card-text">Administra los roles dentro del sistema, incluyendo la creación, actualización y eliminación.</p>
                <Link to="/createRol" className="btn btn-primary">Crear Rol</Link>
              </div>
            </div>
          </div>

          <div className="col-md-4 d-flex align-items-stretch mb-4">
            <div className="card text-center">
              <div className="card-body">
                <i className="fas fa-user fa-4x mb-3"></i>
                <h5 className="card-title">Gestión de Usuarios</h5>
                <p className="card-text">Gestiona usuarios del sistema con opciones para crear, consultar, actualizar y eliminar.</p>
                <Link to="/createUser" className="btn btn-primary">Crear Usuario</Link>
              </div>
            </div>
          </div>
        </div> */}
      </main>

      <Routes>
        <Route path="/createEnte" element={<CreateEnte createEnte={createEnte} />} />
        <Route path="/queryEnte" element={<QueryEnte getEnte={getEnte} />} />
        <Route path="/updateEnte" element={<UpdateEnte updateEnte={updateEnte} />} />
        <Route path="/deleteEnte" element={<DeleteEnte deleteEnte={deleteEnte} />} />
        <Route path="/createRol" element={<CreateRol createRol={createRol} />} />
        <Route path="/queryRol" element={<QueryRol getRol={getRol} />} />
        <Route path="/updateRol" element={<UpdateRol updateRol={updateRol} />} />
        <Route path="/deleteRol" element={<DeleteRol deleteRol={deleteRol} />} />
        <Route path="/createUser" element={<CreateUser createUser={createUser} />} />
        <Route path="/queryUser" element={<QueryUser getUser={getUser} />} />
        <Route path="/updateUser" element={<UpdateUser updateUser={updateUser} />} />
        <Route path="/deleteUser" element={<DeleteUser deleteUser={deleteUser} />} />
        <Route path="/evaluacion" element={<Evaluacion />} />
        <Route path="/version" element={<Version />} />
      </Routes>
    </Router>
  );
};

export default App;
