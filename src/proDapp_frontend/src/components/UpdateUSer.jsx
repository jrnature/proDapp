import React, { useState } from 'react';

const UpdateUser = ({ updateUser }) => {
  const [idUsuario, setIdUsuario] = useState('');
  const [nombre, setNombre] = useState('');
  const [puesto, setPuesto] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ente, setEnte] = useState('');
  const [rol, setRol] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const datos = {
        nombre,
        puesto,
        correo,
        telefono,
        username,
        password,
        ente: parseInt(ente, 10),
        rol: parseInt(rol, 10)
      };
      const result = await updateUser(parseInt(idUsuario, 10), datos);

      console.log('Resultado de updateUser:', result);
      alert('Usuario actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      alert('Error al actualizar el usuario');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Actualizar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="idUsuario" className="form-label">ID del Usuario</label>
          <input
            type="number"
            className="form-control"
            id="idUsuario"
            value={idUsuario}
            onChange={(e) => setIdUsuario(e.target.value)}
            placeholder="Ingresa el ID del usuario"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingresa el nombre del usuario"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="puesto" className="form-label">Puesto</label>
          <input
            type="text"
            className="form-control"
            id="puesto"
            value={puesto}
            onChange={(e) => setPuesto(e.target.value)}
            placeholder="Ingresa el puesto del usuario"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="correo" className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Ingresa el correo electrónico"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">Teléfono</label>
          <input
            type="text"
            className="form-control"
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Ingresa el número de teléfono"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingresa el nombre de usuario"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa la contraseña"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="ente" className="form-label">Ente</label>
          <input
            type="number"
            className="form-control"
            id="ente"
            value={ente}
            onChange={(e) => setEnte(e.target.value)}
            placeholder="Ingresa la clave del ente"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="rol" className="form-label">Rol</label>
          <input
            type="number"
            className="form-control"
            id="rol"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            placeholder="Ingresa el rol del usuario"
          />
        </div>

        <button type="submit" className="btn btn-primary">Actualizar</button>
      </form>
    </div>
  );
};

export default UpdateUser;
