import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateEnte from './components/CreateEnte';
import QueryEnte from './components/QueryEnte';
import UpdateEnte from './components/UpdateEnte';
import DeleteEnte from './components/DeleteEnte';
import { entes } from '../../declarations/entes/index.js';

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

  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/create">Crear Ente</Link></li>
          <li><Link to="/query">Consultar Ente</Link></li>
          <li><Link to="/update">Actualizar Ente</Link></li>
          <li><Link to="/delete">Eliminar Ente</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/create" element={<CreateEnte createEnte={createEnte} />} />
        <Route path="/query" element={<QueryEnte getEnte={getEnte} />} />
        <Route path="/update" element={<UpdateEnte updateEnte={updateEnte} />} />
        <Route path="/delete" element={<DeleteEnte deleteEnte={deleteEnte} />} />
      </Routes>
    </Router>
  );
};

export default App;
