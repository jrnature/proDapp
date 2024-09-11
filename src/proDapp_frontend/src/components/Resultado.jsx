import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { evaluacionIntegral } from '../../../declarations/evaluacionIntegral/index';

const Resultado = () => {
  const [idResultado, setidResultado] = useState('');
  const [datos, setDatos] = useState({
    resultado: '',
    descripcion: ''
  });
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatos(prevState => ({ ...prevState, [name]: value }));
  };

  const handleIdResultadoChange = (e) => {
    setidResultado(e.target.value);
  };

  const handleCreate = async () => {
    try {
      await evaluacionIntegral.newResultado(parseInt(idResultado), datos);
      setMessage('Resultado creado con éxito.');
    } catch (error) {
      setMessage('Error al crear el resultado.');
    }
  };

  const handleGet = async () => {
    try {
      const result = await evaluacionIntegral.getResultado(parseInt(idResultado));
      setDatos(result);
      setMessage('Resultado consultada con éxito.');
    } catch (error) {
      setMessage('Error al consultar el resultado.');
    }
  };

  const handleUpdate = async () => {
    try {
      await evaluacionIntegral.updateResultado(parseInt(idResultado), datos);
      setMessage('Resultado actualizado con éxito.');
    } catch (error) {
      setMessage('Error al actualizar el resultado.');
    }
  };

  const handleDelete = async () => {
    try {
      await evaluacionIntegral.deleteResultado(parseInt(idResultado));
      setMessage('Resultado eliminado con éxito.');
      setDatos({
        resultado: '',
        descripcion: ''
      });
    } catch (error) {
      setMessage('Error al eliminar el resultado.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Resultados</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form>
        <Form.Group controlId="idresultado">
          <Form.Label>ID de Resultado</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingrese el ID del resultado"
            value={idResultado}
            onChange={handleIdResultadoChange}
          />
        </Form.Group>
        <Form.Group controlId="resultado">
          <Form.Label>Resultado</Form.Label>
          <Form.Control
            type="text"
            name="resultado"
            placeholder="Ingrese el resultado"
            value={datos.resultado}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="descripcion">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type="text"
            name="descripcion"
            placeholder="Ingrese la descripción"
            value={datos.descripcion}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={handleCreate}>Crear Resultado</Button>
            <Button variant="secondary" className="ms-2" onClick={handleGet}>Consultar Resultado</Button>
            <Button variant="warning" className="ms-2" onClick={handleUpdate}>Actualizar Resultado</Button>
            <Button variant="danger" className="ms-2" onClick={handleDelete}>Eliminar Resultado</Button>
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

export default Resultado;
