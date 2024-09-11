import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { evaluacionIntegral } from '../../../declarations/evaluacionIntegral/index';

const Estado = () => {
  const [idEstado, setidEstado] = useState('');
  const [datos, setDatos] = useState({
    estado: '',
    descripcion: ''
  });
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatos(prevState => ({ ...prevState, [name]: value }));
  };

  const handleIdEstadoChange = (e) => {
    setidEstado(e.target.value);
  };

  const handleCreate = async () => {
    try {
      await evaluacionIntegral.newEstado(parseInt(idEstado), datos);
      setMessage('Estado creado con éxito.');
    } catch (error) {
      setMessage('Error al crear el estado.');
    }
  };

  const handleGet = async () => {
    try {
      const result = await evaluacionIntegral.getEstado(parseInt(idEstado));
      setDatos(result);
      setMessage('Estado consultada con éxito.');
    } catch (error) {
      setMessage('Error al consultar el estado.');
    }
  };

  const handleUpdate = async () => {
    try {
      await evaluacionIntegral.updateEstado(parseInt(idEstado), datos);
      setMessage('Estado actualizado con éxito.');
    } catch (error) {
      setMessage('Error al actualizar el estado.');
    }
  };

  const handleDelete = async () => {
    try {
      await evaluacionIntegral.deleteEstado(parseInt(idEstado));
      setMessage('Estado eliminado con éxito.');
      setDatos({
        estado: '',
        descripcion: ''
      });
    } catch (error) {
      setMessage('Error al eliminar el estado.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Estado</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form>
        <Form.Group controlId="idEstado">
          <Form.Label>ID de Estado</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingrese el ID del estado"
            value={idEstado}
            onChange={handleIdEstadoChange}
          />
        </Form.Group>
        <Form.Group controlId="nombre">
          <Form.Label>Estado</Form.Label>
          <Form.Control
            type="text"
            name="estado"
            placeholder="Ingrese el estado"
            value={datos.estado}
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
            <Button variant="primary" onClick={handleCreate}>Crear Estado</Button>
            <Button variant="secondary" className="ms-2" onClick={handleGet}>Consultar Estado</Button>
            <Button variant="warning" className="ms-2" onClick={handleUpdate}>Actualizar Estado</Button>
            <Button variant="danger" className="ms-2" onClick={handleDelete}>Eliminar Estado</Button>
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

export default Estado;
