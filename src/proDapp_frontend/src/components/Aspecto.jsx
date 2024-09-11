import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { evaluacionIntegral } from '../../../declarations/evaluacionIntegral/index';

const Aspecto = () => {
  const [idAspecto, setidAspecto] = useState('');
  const [datos, setDatos] = useState({
    nombre: '',
    descripcion: ''
  });
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatos(prevState => ({ ...prevState, [name]: value }));
  };

  const handleIdAspectoChange = (e) => {
    setidAspecto(e.target.value);
  };

  const handleCreate = async () => {
    try {
      await evaluacionIntegral.newAspecto(parseInt(idAspecto), datos);
      setMessage('Aspecto creado con éxito.');
    } catch (error) {
      setMessage('Error al crear el aspecto.');
    }
  };

  const handleGet = async () => {
    try {
      const result = await evaluacionIntegral.getAspecto(parseInt(idAspecto));
      setDatos(result);
      setMessage('Aspecto consultada con éxito.');
    } catch (error) {
      setMessage('Error al consultar el aspecto.');
    }
  };

  const handleUpdate = async () => {
    try {
      await evaluacionIntegral.updateAspecto(parseInt(idAspecto), datos);
      setMessage('Aspecto actualizado con éxito.');
    } catch (error) {
      setMessage('Error al actualizar el aspecto.');
    }
  };

  const handleDelete = async () => {
    try {
      await evaluacionIntegral.deleteAspecto(parseInt(idAspecto));
      setMessage('Aspecto eliminado con éxito.');
      setDatos({
        nombre: '',
        descripcion: ''
      });
    } catch (error) {
      setMessage('Error al eliminar el aspecto.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de aspecto</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form>
        <Form.Group controlId="idAspecto">
          <Form.Label>ID de Aspecto</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingrese el ID del aspecto"
            value={idAspecto}
            onChange={handleIdAspectoChange}
          />
        </Form.Group>
        <Form.Group controlId="nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            placeholder="Ingrese el aspecto"
            value={datos.nombre}
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
            <Button variant="primary" onClick={handleCreate}>Crear Aspecto</Button>
            <Button variant="secondary" className="ms-2" onClick={handleGet}>Consultar Aspecto</Button>
            <Button variant="warning" className="ms-2" onClick={handleUpdate}>Actualizar Aspecto</Button>
            <Button variant="danger" className="ms-2" onClick={handleDelete}>Eliminar Aspecto</Button>
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

export default Aspecto;
