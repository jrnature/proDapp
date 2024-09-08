import React, { useState } from 'react';

const UpdateUser = () => {
  const [user, setUser] = useState({
    idUsuario: '',
    nombre: '',
    puesto: '',
    ente: '',
    correo: '',
    rol: '',
    telefono: '',
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/updateUser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      alert('Usuario actualizado con éxito');
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Actualizar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="idUsuario" className="form-label">ID Usuario</label>
          <input type="number" id="idUsuario" name="idUsuario" className="form-control" placeholder="ID Usuario" onChange={handleChange} value={user.idUsuario} required />
        </div>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input type="text" id="nombre" name="nombre" className="form-control" placeholder="Nombre" onChange={handleChange} value={user.nombre} />
        </div>
        <div className="mb-3">
          <label htmlFor="puesto" className="form-label">Puesto</label>
          <input type="text" id="puesto" name="puesto" className="form-control" placeholder="Puesto" onChange={handleChange} value={user.puesto} />
        </div>
        <div className="mb-3">
          <label htmlFor="ente" className="form-label">Ente</label>
          <input type="number" id="ente" name="ente" className="form-control" placeholder="Ente" onChange={handleChange} value={user.ente} />
        </div>
        <div className="mb-3">
          <label htmlFor="correo" className="form-label">Correo</label>
          <input type="email" id="correo" name="correo" className="form-control" placeholder="Correo" onChange={handleChange} value={user.correo} />
        </div>
        <div className="mb-3">
          <label htmlFor="rol" className="form-label">Rol</label>
          <input type="number" id="rol" name="rol" className="form-control" placeholder="Rol" onChange={handleChange} value={user.rol} />
        </div>
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">Teléfono</label>
          <input type="tel" id="telefono" name="telefono" className="form-control" placeholder="Teléfono" onChange={handleChange} value={user.telefono} />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Nombre de Usuario</label>
          <input type="text" id="username" name="username" className="form-control" placeholder="Nombre de Usuario" onChange={handleChange} value={user.username} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input type="password" id="password" name="password" className="form-control" placeholder="Contraseña" onChange={handleChange} value={user.password} />
        </div>
        <button type="submit" className="btn btn-warning">Actualizar Usuario</button>
      </form>
    </div>
  );
};

export default UpdateUser;
