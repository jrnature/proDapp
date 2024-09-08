import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DeleteUser = () => {
  const [idUsuario, setIdUsuario] = useState('');

  const handleChange = (e) => {
    setIdUsuario(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/deleteUser', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idUsuario })
      });
      alert('Usuario eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Eliminar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="idUsuario" className="form-label">ID Usuario</label>
          <input type="number" id="idUsuario" name="idUsuario" className="form-control" placeholder="ID Usuario" onChange={handleChange} value={idUsuario} required />
        </div>
        <button type="submit" className="btn btn-danger">Eliminar Usuario</button>
      </form>
    </div>
  );
};

export default DeleteUser;
