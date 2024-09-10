import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { versiones } from '../../../declarations/versiones/index';

const Version = () => {
  const [idVersion, setIdVersion] = useState('');
  const [datos, setDatos] = useState({
    version: '',
    descripcion: ''
  });
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatos(prevState => ({ ...prevState, [name]: value }));
  };

  const handleIdVersionChange = (e) => {
    setIdVersion(e.target.value);
  };

  const handleCreate = async () => {
    try {
      await versiones.newVersion(parseInt(idVersion), datos);
      setMessage('Versión creada con éxito.');
    } catch (error) {
      setMessage('Error al crear la versión.');
    }
  };

  const handleGet = async () => {
    try {
      const result = await versiones.getVersion(parseInt(idVersion));
      setDatos(result);
      setMessage('Versión consultada con éxito.');
    } catch (error) {
      setMessage('Error al consultar la versión.');
    }
  };

  const handleUpdate = async () => {
    try {
      await versiones.updateVersion(parseInt(idVersion), datos);
      setMessage('Versión actualizada con éxito.');
    } catch (error) {
      setMessage('Error al actualizar la versión.');
    }
  };

  const handleDelete = async () => {
    try {
      await versiones.deleteVersion(parseInt(idVersion));
      setMessage('Versión eliminada con éxito.');
      setDatos({
        version: '',
        descripcion: ''
      });
    } catch (error) {
      setMessage('Error al eliminar la versión.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Versiones</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form>
        <Form.Group controlId="idVersion">
          <Form.Label>ID de Versión</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingrese el ID de la versión"
            value={idVersion}
            onChange={handleIdVersionChange}
          />
        </Form.Group>
        <Form.Group controlId="version">
          <Form.Label>Versión</Form.Label>
          <Form.Control
            type="text"
            name="version"
            placeholder="Ingrese la versión"
            value={datos.version}
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
            <Button variant="primary" onClick={handleCreate}>Crear Versión</Button>
            <Button variant="secondary" className="ms-2" onClick={handleGet}>Consultar Versión</Button>
            <Button variant="warning" className="ms-2" onClick={handleUpdate}>Actualizar Versión</Button>
            <Button variant="danger" className="ms-2" onClick={handleDelete}>Eliminar Versión</Button>
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

export default Version;
