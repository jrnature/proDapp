import React, { useState } from 'react';

const CreateUser = ({ createUser }) => {
  const [user, setUser] = useState({
    idUsuario: '',
    nombre: '',
    puesto: '',
    ente: '',
    correo: '',
    rol: '',
    telefono: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const idUsuario = parseInt(user.idUsuario, 10);
      const ente = parseInt(user.ente, 10);
      const rol = parseInt(user.rol, 10);

      if (isNaN(idUsuario) || isNaN(ente) || isNaN(rol)) {
        alert('ID Usuario, Ente o Rol inválidos. Por favor, ingrese números enteros.');
        return;
      }

      const result = await createUser(idUsuario, {
        nombre: user.nombre,
        puesto: user.puesto,
        ente,
        correo: user.correo,
        rol,
        telefono: user.telefono,
        username: user.username,
        password: user.password,
      });

      if (result !== null) {
        alert('Usuario creado correctamente');
      } else {
        alert('No se recibió un resultado válido.');
      }

      setUser({
        idUsuario: '',
        nombre: '',
        puesto: '',
        ente: '',
        correo: '',
        rol: '',
        telefono: '',
        username: '',
        password: '',
      });
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      alert('Hubo un error al crear el usuario. Intenta nuevamente.');
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Crear Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="idUsuario" className="form-label">ID Usuario</label>
          <input
            type="number"
            name="idUsuario"
            className="form-control"
            placeholder="ID Usuario"
            value={user.idUsuario}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            placeholder="Nombre"
            value={user.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="puesto" className="form-label">Puesto</label>
          <input
            type="text"
            name="puesto"
            className="form-control"
            placeholder="Puesto"
            value={user.puesto}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ente" className="form-label">Ente</label>
          <input
            type="number"
            name="ente"
            className="form-control"
            placeholder="Ente"
            value={user.ente}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="correo" className="form-label">Correo</label>
          <input
            type="email"
            name="correo"
            className="form-control"
            placeholder="Correo"
            value={user.correo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rol" className="form-label">Rol</label>
          <input
            type="number"
            name="rol"
            className="form-control"
            placeholder="Rol"
            value={user.rol}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">Teléfono</label>
          <input
            type="text"
            name="telefono"
            className="form-control"
            placeholder="Teléfono"
            value={user.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Nombre de Usuario</label>
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="Nombre de Usuario"
            value={user.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Contraseña"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Crear Usuario</button>
      </form>
    </div>
  );
};

export default CreateUser;
