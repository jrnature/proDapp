import React, { useState } from 'react';

const CreateEnte = ({ createEnte }) => {
  const [ente, setEnte] = useState({
    idEnte: '',
    nombre: '',
    director: '',
    correo: '',
    telefono: '',
    enlace: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEnte(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const idEnte = parseInt(ente.idEnte, 10);
      if (isNaN(idEnte)) {
        alert('ID inválido. Por favor, ingrese un número entero para el ID.');
        return;
      }
      const result = await createEnte(idEnte, {
        nombre: ente.nombre,
        director: ente.director,
        correo: ente.correo,
        telefono: ente.telefono,
        enlace: ente.enlace,
      });

      if (result !== null) {
        alert('Ente creado correctamente');
      } else {
        alert('No se recibió un resultado válido.');
      }

      setEnte({
        idEnte: '',
        nombre: '',
        director: '',
        correo: '',
        telefono: '',
        enlace: '',
      });
    } catch (error) {
      console.error('Error al crear el ente:', error);
      alert('Hubo un error al crear el ente. Intenta nuevamente.');
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Crear Ente</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="idEnte" className="form-label">ID del Ente</label>
          <input
            type="number"
            name="idEnte"
            className="form-control"
            placeholder="ID del Ente"
            value={ente.idEnte}
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
            value={ente.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="director" className="form-label">Director</label>
          <input
            type="text"
            name="director"
            className="form-control"
            placeholder="Director"
            value={ente.director}
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
            value={ente.correo}
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
            value={ente.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="enlace" className="form-label">Enlace</label>
          <input
            type="text"
            name="enlace"
            className="form-control"
            placeholder="Enlace"
            value={ente.enlace}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Crear Ente</button>
      </form>
    </div>
  );
};

export default CreateEnte;






