import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { evaluacionIntegral } from '../../../declarations/evaluacionIntegral/index';

const Version = () => {
  const [idVersion, setIdVersion] = useState('');
  const [datos, setDatos] = useState({
    descripcion: '',
    preguntas: 0
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatos(prevState => ({
      ...prevState,
      [name]: name === 'preguntas' ? parseInt(value) : value
    }));
  };

  const handleIdVersionChange = (e) => {
    setIdVersion(e.target.value);
  };

  const handleCreate = async () => {
    try {
      await evaluacionIntegral.newVersion(parseInt(idVersion), {
        descripcion: datos.descripcion,
        preguntas: parseInt(datos.preguntas),
      });
      setMessage('Versión creada con éxito.');
    } catch (error) {
      setMessage('Error al crear la versión: ' + error.message);
    }
  };

  const handleGet = async () => {
    try {
      const result = await evaluacionIntegral.getVersion(parseInt(idVersion));
      if (result) {
        setDatos({
          descripcion: result.descripcion || '',
          preguntas: result.preguntas !== undefined ? parseInt(result.preguntas) : 0,
        });
        setMessage('Versión consultada con éxito.');
      } else {
        setMessage('No se encontró la versión.');
      }
    } catch (error) {
      setMessage('Error al consultar la versión: ' + error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      await evaluacionIntegral.updateVersion(parseInt(idVersion), datos);
      setMessage('Versión actualizada con éxito.');
    } catch (error) {
      setMessage('Error al actualizar la versión: ' + error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await evaluacionIntegral.deleteVersion(parseInt(idVersion));
      setMessage('Versión eliminada con éxito.');
      setDatos({
        descripcion: '',
        preguntas: 0
      });
    } catch (error) {
      setMessage('Error al eliminar la versión: ' + error.message);
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
        <Form.Group controlId="preguntas">
          <Form.Label>Número de Preguntas</Form.Label>
          <Form.Control
            type="number"
            name="preguntas"
            placeholder="Ingrese el número de preguntas"
            value={datos.preguntas}
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
