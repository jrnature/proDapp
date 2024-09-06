import React, { useState } from 'react';

const UpdateEnte = ({ updateEnte }) => {
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

      await updateEnte(idEnte, {
        nombre: ente.nombre.trim(),
        director: ente.director.trim(),
        correo: ente.correo.trim(),
        telefono: ente.telefono.trim(),
        enlace: ente.enlace.trim(),
      });

      alert('Ente actualizado correctamente');
      setEnte({
        idEnte: '',
        nombre: '',
        director: '',
        correo: '',
        telefono: '',
        enlace: '',
      });
    } catch (error) {
      console.error('Error al actualizar el ente:', error);
      alert('Error al actualizar el ente');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Actualizar Ente</h2>
      <input
        type="number"
        name="idEnte"
        placeholder="ID del Ente"
        value={ente.idEnte}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={ente.nombre}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="director"
        placeholder="Director"
        value={ente.director}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="correo"
        placeholder="Correo"
        value={ente.correo}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="telefono"
        placeholder="Teléfono"
        value={ente.telefono}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="enlace"
        placeholder="Enlace"
        value={ente.enlace}
        onChange={handleChange}
        required
      />
      <button type="submit">Actualizar Ente</button>
    </form>
  );
};

export default UpdateEnte;
