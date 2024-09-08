import React, { useState } from 'react';

const CreateRol = ({ createRol }) => {
  const [rol, setRol] = useState({
    idRol: '',
    nombre: '',
    descripcion: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRol(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const idRol = parseInt(rol.idRol, 10);
      if (isNaN(idRol)) {
        alert('ID inválido. Por favor, ingrese un número entero para el ID.');
        return;
      }
      const result = await createRol(idRol, {
        nombre: rol.nombre,
        descripcion: rol.descripcion,
      });

      if (result !== null) {
        alert('Rol creado correctamente');
      } else {
        alert('No se recibió un resultado válido.');
      }

      setRol({
        idRol: '',
        nombre: '',
        descripcion: '',
      });
    } catch (error) {
      console.error('Error al crear el rol:', error);
      alert('Hubo un error al crear el rol. Intenta nuevamente.');
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Crear Rol</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="idRol" className="form-label">ID del Rol</label>
          <input
            type="number"
            name="idRol"
            className="form-control"
            placeholder="ID del Rol"
            value={rol.idRol}
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
            value={rol.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <input
            type="text"
            name="descripcion"
            className="form-control"
            placeholder="Descripción"
            value={rol.descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Crear Rol</button>
      </form>
    </div>
  );
};

export default CreateRol;
