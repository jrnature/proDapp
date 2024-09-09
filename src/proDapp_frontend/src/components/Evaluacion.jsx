import React, { useState } from 'react';

const Evaluacion = () => {
  const [folio, setFolio] = useState('');
  const [datos, setDatos] = useState({
    ente: '',
    usuario: '',
    fechaInicio: '',
    fechaFin: '',
    evaluador: '',
    resultado: '',
    estado: ''
  });
  const [result, setResult] = useState('');

  // Manejo de cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatos({
      ...datos,
      [name]: value
    });
  };

  const handleFolioChange = (e) => {
    setFolio(e.target.value);
  };

  // Crear nueva evaluación
  const createEvaluacion = async () => {
    try {
      await evaluaciones.newEvaluacion(parseInt(folio), {
        ente: parseInt(datos.ente),
        usuario: parseInt(datos.usuario),
        fechaInicio: datos.fechaInicio,
        fechaFin: datos.fechaFin,
        evaluador: parseInt(datos.evaluador),
        resultado: parseInt(datos.resultado),
        estado: parseInt(datos.estado)
      });
      setResult('Evaluación creada exitosamente');
    } catch (error) {
      console.error('Error al crear la evaluación:', error);
      setResult('Error al crear la evaluación');
    }
  };

  // Consultar evaluación
  const getEvaluacion = async () => {
    try {
      const response = await evaluaciones.getEvaluacion(parseInt(folio));
      setDatos({
        ente: response.ente,
        usuario: response.usuario,
        fechaInicio: response.fechaInicio,
        fechaFin: response.fechaFin,
        evaluador: response.evaluador,
        resultado: response.resultado,
        estado: response.estado
      });
      setResult('Evaluación consultada exitosamente');
    } catch (error) {
      console.error('Error al consultar la evaluación:', error);
      setResult('Error al consultar la evaluación');
    }
  };

  // Actualizar evaluación
  const updateEvaluacion = async () => {
    try {
      await evaluaciones.updateEvaluacion(parseInt(folio), {
        ente: parseInt(datos.ente),
        usuario: parseInt(datos.usuario),
        fechaInicio: datos.fechaInicio,
        fechaFin: datos.fechaFin,
        evaluador: parseInt(datos.evaluador),
        resultado: parseInt(datos.resultado),
        estado: parseInt(datos.estado)
      });
      setResult('Evaluación actualizada exitosamente');
    } catch (error) {
      console.error('Error al actualizar la evaluación:', error);
      setResult('Error al actualizar la evaluación');
    }
  };

  // Eliminar evaluación
  const deleteEvaluacion = async () => {
    try {
      await evaluaciones.deleteEvaluacion(parseInt(folio));
      setResult('Evaluación eliminada exitosamente');
    } catch (error) {
      console.error('Error al eliminar la evaluación:', error);
      setResult('Error al eliminar la evaluación');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Evaluaciones</h2>
      <div className="mb-3">
        <label>Folio</label>
        <input
          type="text"
          className="form-control"
          name="folio"
          value={folio}
          onChange={handleFolioChange}
        />
      </div>
      <div className="mb-3">
        <label>Ente</label>
        <input
          type="text"
          className="form-control"
          name="ente"
          value={datos.ente}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label>Usuario</label>
        <input
          type="text"
          className="form-control"
          name="usuario"
          value={datos.usuario}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label>Fecha Inicio</label>
        <input
          type="text"
          className="form-control"
          name="fechaInicio"
          value={datos.fechaInicio}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label>Fecha Fin</label>
        <input
          type="text"
          className="form-control"
          name="fechaFin"
          value={datos.fechaFin}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label>Evaluador</label>
        <input
          type="text"
          className="form-control"
          name="evaluador"
          value={datos.evaluador}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label>Resultado</label>
        <input
          type="text"
          className="form-control"
          name="resultado"
          value={datos.resultado}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label>Estado</label>
        <input
          type="text"
          className="form-control"
          name="estado"
          value={datos.estado}
          onChange={handleInputChange}
        />
      </div>
      <button className="btn btn-success me-2" onClick={createEvaluacion}>Crear Evaluación</button>
      <button className="btn btn-primary me-2" onClick={getEvaluacion}>Consultar Evaluación</button>
      <button className="btn btn-warning me-2" onClick={updateEvaluacion}>Actualizar Evaluación</button>
      <button className="btn btn-danger me-2" onClick={deleteEvaluacion}>Eliminar Evaluación</button>
      <p className="mt-3">{result}</p>
    </div>
  );
};

export default Evaluacion;
