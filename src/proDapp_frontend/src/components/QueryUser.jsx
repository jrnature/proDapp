import React, { useState } from 'react';

const QueryUser = ({ getUser }) => {
  const [idUsuario, setIdUsuario] = useState('');
  const [user, setUser] = useState(null);

  const handleChange = (e) => {
    setIdUsuario(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await getUser(parseInt(idUsuario, 10));
      if (userData) {
        setUser(userData);
      } else {
        alert('Usuario no encontrado');
      }
    } catch (error) {
      console.error('Error al consultar el usuario:', error);
      alert('Error al consultar el usuario');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Consultar Usuario</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="idUsuario" className="form-label">ID del Usuario</label>
          <input
            type="number"
            name="idUsuario"
            className="form-control"
            placeholder="Ingresa el ID del usuario"
            value={idUsuario}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Consultar</button>
      </form>

      {user && (
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Detalles del Usuario</h3>
            <p className="card-text"><strong>Nombre:</strong> {user.nombre}</p>
            <p className="card-text"><strong>Puesto:</strong> {user.puesto}</p>
            <p className="card-text"><strong>Correo:</strong> {user.correo}</p>
            <p className="card-text"><strong>Teléfono:</strong> {user.telefono}</p>
            <p className="card-text"><strong>Username:</strong> {user.username}</p>
            <p className="card-text"><strong>Rol:</strong> {user.rol}</p>
            <p className="card-text"><strong>Ente:</strong> {user.ente}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QueryUser;
