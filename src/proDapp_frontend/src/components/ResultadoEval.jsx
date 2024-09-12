import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { evaluacionIntegral } from '../../../declarations/evaluacionIntegral/index';

const ResultadoEval = () => {
  const [idResultadoEval, setIdResultadoEval] = useState('');
  const [datos, setDatos] = useState({
    nombre: '',
    descripcion: '',
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatos(prevState => ({ ...prevState, [name]: value }));
  };

  const handleIdResultadoEvalChange = (e) => {
    setIdResultadoEval(e.target.value);
  };

  const handleCreate = async () => {
    try {
      await evaluacionIntegral.newResultadoEval(parseInt(idResultadoEval), datos);
      setMessage('Resultado de evaluación creado con éxito.');
    } catch (error) {
      setMessage('Error al crear el resultado de evaluación.');
    }
  };

  const handleGet = async () => {
    try {
      const result = await evaluacionIntegral.getResultadoEvaluacion(parseInt(idResultadoEval));
      setDatos(result);
      setMessage('Resultado de evaluación consultado con éxito.');
    } catch (error) {
      setMessage('Error al cresultado de evaluación.');
    }
  };

  const handleUpdate = async () => {
    try {
      await evaluacionIntegral.updateResultadoEvaluacion(parseInt(idResultadoEval), datos);
      setMessage('Resultado de evaluación actualizado con éxito.');
    } catch (error) {
      setMessage('Error al resultado de evaluación.');
    }
  };

  const handleDelete = async () => {
    try {
      await evaluacionIntegral.deleteResultadoEvaluacion(parseInt(idResultadoEval));
      setMessage('Resultado de evaluación eliminado con éxito.');
      setDatos({
        nombre: '',
        descripcion: '',
      });
    } catch (error) {
      setMessage('Error al resultado de evaluación.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Resultados de evaluación</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form>
        <Form.Group controlId="idResultadoEval">
          <Form.Label>ID del resultado de evaluación</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingrese el ID del resultado de evaluación"
            value={idResultadoEval}
            onChange={handleIdResultadoEvalChange}
          />
        </Form.Group>
        <Form.Group controlId="nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            placeholder="Ingrese el nombre del resultado de evaluación"
            value={datos.nombre}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="descripcion">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type="text"
            name="descripcion"
            placeholder="Ingrese la descripción del resultado de evaluación"
            value={datos.descripcion}
            onChange={handleInputChange}
          />
        </Form.Group>
        
        <Form.Group className="mt-3">
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={handleCreate}>Crear Resultado de evaluación</Button>
            <Button variant="secondary" onClick={handleGet}>Consultar Resultado de evaluación</Button>
            <Button variant="warning" onClick={handleUpdate}>Actualizar Resultado de evaluación</Button>
            <Button variant="danger" onClick={handleDelete}>Eliminar Resultado de evaluación</Button>
          </div>
        </Form.Group>
      </Form>
      <div className="mt-4">
        <h4>Resultado:</h4>
        <pre>{JSON.stringify(datos, null, 2)}</pre>
      </div>
    </div>
  );
};

export default ResultadoEval;
