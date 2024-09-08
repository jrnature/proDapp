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
    <div className="container mt-5">
      <h2 className="mb-4">Consultar Ente</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="idEnte" className="form-label">ID del Ente</label>
          <input
            type="number"
            name="idEnte"
            className="form-control"
            placeholder="Ingresa el ID del ente"
            value={idEnte}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Consultar</button>
      </form>

      {ente && (
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Detalles del Ente</h3>
            <p className="card-text"><strong>Nombre:</strong> {ente.nombre}</p>
            <p className="card-text"><strong>Director:</strong> {ente.director}</p>
            <p className="card-text"><strong>Correo:</strong> {ente.correo}</p>
            <p className="card-text"><strong>Teléfono:</strong> {ente.telefono}</p>
            <p className="card-text"><strong>Enlace:</strong> {ente.enlace}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QueryEnte;

