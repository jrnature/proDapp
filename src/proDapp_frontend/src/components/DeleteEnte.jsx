import React, { useState } from 'react';

const DeleteEnte = ({ deleteEnte }) => {
  const [idEnte, setIdEnte] = useState('');

  const handleChange = (e) => {
    setIdEnte(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = parseInt(idEnte, 10);

      // Verifica si el ID es un número válido
      if (isNaN(id)) {
        alert('ID inválido. Por favor, ingrese un número entero para el ID.');
        return;
      }

      // Llama a la función deleteEnte
      await deleteEnte(id);

      // Muestra un mensaje de éxito
      alert('Ente eliminado correctamente');
      setIdEnte(''); // Limpia el campo de entrada
    } catch (error) {
      // Maneja errores y muestra un mensaje adecuado
      console.error('Error al eliminar el ente:', error);
      alert('Error al eliminar el ente. Intenta nuevamente.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Eliminar Ente</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="idEnte" className="form-label">ID del Ente</label>
          <input
            type="number"
            id="idEnte"
            className="form-control"
            placeholder="ID del Ente"
            value={idEnte}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-danger">Eliminar</button>
      </form>
    </div>
  );
};

export default DeleteEnte;
