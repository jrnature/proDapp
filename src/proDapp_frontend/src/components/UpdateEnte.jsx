import React, { useState } from 'react';

const UpdateEnte = ({ updateEnte }) => {
  const [idEnte, setIdEnte] = useState('');
  const [nombre, setNombre] = useState('');
  const [director, setDirector] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [enlace, setEnlace] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const datos = { nombre, director, correo, telefono, enlace };
      const result = await updateEnte(parseInt(idEnte, 10), datos);

      
      console.log('Resultado de updateEnte:', result);

      // Mostrar mensaje de éxito sin verificación adicional
      alert('Ente actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar el ente:', error);
      alert('Error al actualizar el ente');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Actualizar Ente</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="idEnte" className="form-label">ID del Ente</label>
          <input
            type="number"
            className="form-control"
            id="idEnte"
            value={idEnte}
            onChange={(e) => setIdEnte(e.target.value)}
            placeholder="Ingresa el ID del ente"
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
            placeholder="Ingresa el nombre del ente"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="director" className="form-label">Director</label>
          <input
            type="text"
            className="form-control"
            id="director"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            placeholder="Ingresa el nombre del director"
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
          <label htmlFor="enlace" className="form-label">Enlace</label>
          <input
            type="text"
            className="form-control"
            id="enlace"
            value={enlace}
            onChange={(e) => setEnlace(e.target.value)}
            placeholder="Ingresa el enlace del ente"
          />
        </div>

        <button type="submit" className="btn btn-primary">Actualizar</button>
      </form>
    </div>
  );
};

export default UpdateEnte;
