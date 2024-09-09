import React, { useState } from 'react';

const Autoevaluacion = ({ createRespuesta, updateRespuesta, deleteRespuesta }) => {
  const [respuesta, setRespuesta] = useState({
    idRespuesta: '',
    pregunta: '',
    respuesta: '',
    evidencia: null,
    usuario: '',
    folioEvaluacion: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRespuesta(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const idRespuesta = parseInt(respuesta.idRespuesta, 10);
      if (isNaN(idRespuesta)) {
        alert('ID inválido. Por favor, ingrese un número entero para el ID de la respuesta.');
        return;
      }
      const result = await createRespuesta(idRespuesta, {
        pregunta: parseInt(respuesta.pregunta, 10),
        respuesta: respuesta.respuesta,
        evidencia: respuesta.evidencia,
        usuario: parseInt(respuesta.usuario, 10),
        folioEvaluacion: parseInt(respuesta.folioEvaluacion, 10)
      });

      if (result !== null) {
        alert('Respuesta creada correctamente');
      } else {
        alert('No se recibió un resultado válido.');
      }

      setRespuesta({
        idRespuesta: '',
        pregunta: '',
        respuesta: '',
        evidencia: null,
        usuario: '',
        folioEvaluacion: ''
      });
    } catch (error) {
      console.error('Error al crear la respuesta:', error);
      alert('Hubo un error al crear la respuesta. Intenta nuevamente.');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const idRespuesta = parseInt(respuesta.idRespuesta, 10);
      if (isNaN(idRespuesta)) {
        alert('ID inválido para actualizar la respuesta.');
        return;
      }

      await updateRespuesta(idRespuesta, {
        pregunta: parseInt(respuesta.pregunta, 10),
        respuesta: respuesta.respuesta,
        evidencia: respuesta.evidencia,
        usuario: parseInt(respuesta.usuario, 10),
        folioEvaluacion: parseInt(respuesta.folioEvaluacion, 10)
      });

      alert('Respuesta actualizada correctamente');
    } catch (error) {
      console.error('Error al actualizar la respuesta:', error);
      alert('Hubo un error al actualizar la respuesta.');
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const idRespuesta = parseInt(respuesta.idRespuesta, 10);
      if (isNaN(idRespuesta)) {
        alert('ID inválido para eliminar la respuesta.');
        return;
      }

      await deleteRespuesta(idRespuesta);
      alert('Respuesta eliminada correctamente');

      setRespuesta({
        idRespuesta: '',
        pregunta: '',
        respuesta: '',
        evidencia: null,
        usuario: '',
        folioEvaluacion: ''
      });
    } catch (error) {
      console.error('Error al eliminar la respuesta:', error);
      alert('Hubo un error al eliminar la respuesta.');
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Crear/Actualizar Respuesta de Autoevaluación</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="idRespuesta" className="form-label">ID de la Respuesta</label>
          <input
            type="number"
            name="idRespuesta"
            className="form-control"
            placeholder="ID de la Respuesta"
            value={respuesta.idRespuesta}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pregunta" className="form-label">Número de Pregunta</label>
          <input
            type="number"
            name="pregunta"
            className="form-control"
            placeholder="Número de Pregunta"
            value={respuesta.pregunta}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="respuesta" className="form-label">Respuesta</label>
          <input
            type="text"
            name="respuesta"
            className="form-control"
            placeholder="Escribe tu respuesta"
            value={respuesta.respuesta}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="evidencia" className="form-label">Evidencia (URL o archivo)</label>
          <input
            type="text"
            name="evidencia"
            className="form-control"
            placeholder="Adjunta tu evidencia"
            value={respuesta.evidencia}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="usuario" className="form-label">ID del Usuario</label>
          <input
            type="number"
            name="usuario"
            className="form-control"
            placeholder="ID del Usuario"
            value={respuesta.usuario}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="folioEvaluacion" className="form-label">Folio de la Evaluación</label>
          <input
            type="number"
            name="folioEvaluacion"
            className="form-control"
            placeholder="Folio de Evaluación"
            value={respuesta.folioEvaluacion}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Crear Respuesta</button>
        <button type="button" className="btn btn-warning ms-3" onClick={handleUpdate}>Actualizar Respuesta</button>
        <button type="button" className="btn btn-danger ms-3" onClick={handleDelete}>Eliminar Respuesta</button>
      </form>
    </div>
  );
};

export default Autoevaluacion;
