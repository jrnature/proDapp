import React from 'react';
import CreateEnte from './components/CreateEnte';
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

  return (
    <div>
      <h1>Gestión de Entes</h1>
      <CreateEnte createEnte={createEnte} />
    </div>
  );
};

export default App;
