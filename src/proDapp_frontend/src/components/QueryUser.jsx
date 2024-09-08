import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const QueryUser = () => {
  const [idUsuario, setIdUsuario] = useState('');
  const [user, setUser] = useState(null);

  const handleChange = (e) => {
    setIdUsuario(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aquí llamas a la función para obtener los detalles del usuario
      const response = await fetch(`/api/queryUser?idUsuario=${idUsuario}`);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error al consultar el usuario:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Consultar Usuario</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="idUsuario" className="form-label">ID Usuario</label>
          <input 
            type="number" 
            id="idUsuario" 
            name="idUsuario" 
            className="form-control" 
            placeholder="Ingrese el ID del Usuario" 
            onChange={handleChange} 
            value={idUsuario} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Consultar Usuario</button>
      </form>
      {user && (
        <div className="mt-4 p-3 border rounded bg-light">
          <h3>Detalles del Usuario</h3>
          <ul className="list-unstyled">
            <li><strong>ID:</strong> {user.idUsuario}</li>
            <li><strong>Nombre:</strong> {user.nombre}</li>
            <li><strong>Puesto:</strong> {user.puesto}</li>
            <li><strong>Ente:</strong> {user.ente}</li>
            <li><strong>Correo:</strong> {user.correo}</li>
            <li><strong>Rol:</strong> {user.rol}</li>
            <li><strong>Teléfono:</strong> {user.telefono}</li>
            <li><strong>Nombre de Usuario:</strong> {user.username}</li>
            <li><strong>Contraseña:</strong> {user.password}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default QueryUser;
