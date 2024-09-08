import React, { useState } from 'react';

const QueryRol = ({ getRol }) => {
  const [idRol, setIdRol] = useState('');
  const [rol, setRol] = useState(null);

  const handleChange = (e) => {
    setIdRol(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const rolData = await getRol(parseInt(idRol, 10));
      if (rolData) {
        setRol(rolData);
      } else {
        alert('Rol no encontrado');
      }
    } catch (error) {
      console.error('Error al consultar el rol:', error);
      alert('Error al consultar el rol');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Consultar Rol</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="idRol" className="form-label">ID del Rol</label>
          <input
            type="number"
            name="idRol"
            className="form-control"
            placeholder="Ingresa el ID del rol"
            value={idRol}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Consultar</button>
      </form>

      {rol && (
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Detalles del Rol</h3>
            <p className="card-text"><strong>Nombre:</strong> {rol.nombre}</p>
            <p className="card-text"><strong>Descripción:</strong> {rol.descripcion}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QueryRol;
