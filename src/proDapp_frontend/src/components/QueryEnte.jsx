import React, { useState } from 'react';

const QueryEnte = ({ getEnte }) => {
  const [idEnte, setIdEnte] = useState('');
  const [ente, setEnte] = useState(null);

  const handleChange = (e) => {
    setIdEnte(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const enteData = await getEnte(parseInt(idEnte, 10));
      if (enteData) {
        setEnte(enteData);
      } else {
        alert('Ente no encontrado');
      }
    } catch (error) {
      console.error('Error al consultar el ente:', error);
      alert('Error al consultar el ente');
    }
  };

  return (
    <div>
      <h2>Consultar Ente</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="idEnte"
          placeholder="ID del Ente"
          value={idEnte}
          onChange={handleChange}
          required
        />
        <button type="submit">Consultar</button>
      </form>

      {ente && (
        <div>
          <h3>Detalles del Ente</h3>
          <p><strong>Nombre:</strong> {ente.nombre}</p>
          <p><strong>Director:</strong> {ente.director}</p>
          <p><strong>Correo:</strong> {ente.correo}</p>
          <p><strong>Teléfono:</strong> {ente.telefono}</p>
          <p><strong>Enlace:</strong> {ente.enlace}</p>
        </div>
      )}
    </div>
  );
};

export default QueryEnte;
