import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { entes } from '../../../declarations/entes/index';

const Ente = () => {
  const [idEnte, setIdEnte] = useState('');
  const [datos, setDatos] = useState({
    nombre: '',
    director: '',
    correo: '',
    telefono: '',
    enlace: '',
  });
  const [message, setMessage] = useState('');
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatos(prevState => ({ ...prevState, [name]: value }));
  };

  const handleIdEnteChange = (e) => {
    setIdEnte(e.target.value);
  };

  const handleCreate = async () => {
    try {
      await entes.newEnte(parseInt(idEnte), datos);
      setMessage('Ente creado con éxito.');
    } catch (error) {
      setMessage('Error al crear el ente.');
    }
  };

  const handleGet = async () => {
    try {
      const result = await entes.getEnte(parseInt(idEnte));
      setDatos(result);
      setMessage('Ente consultado con éxito.');
    } catch (error) {
      setMessage('Error al consultar el ente.');
    }
  };

  const handleUpdate = async () => {
    try {
      await entes.updateEnte(parseInt(idEnte), datos);
      setMessage('Ente actualizado con éxito.');
    } catch (error) {
      setMessage('Error al actualizar el ente.');
    }
  };

  const handleDelete = async () => {
    try {
      await entes.deleteUsuario(parseInt(idEnte));
      setMessage('Ente eliminado con éxito.');
      setDatos({
        nombre: '',
        director: '',
        correo: '',
        telefono: '',
        enlace: '',
      });
    } catch (error) {
      setMessage('Error al eliminar el ente.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Entes</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form>
        <Form.Group controlId="idEnte">
          <Form.Label>ID del Ente</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingrese el ID del ente"
            value={idEnte}
            onChange={handleIdEnteChange}
          />
        </Form.Group>
        <Form.Group controlId="nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            placeholder="Ingrese el nombre del ente"
            value={datos.nombre}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="director">
          <Form.Label>Director</Form.Label>
          <Form.Control
            type="text"
            name="director"
            placeholder="Ingrese el nombre del director"
            value={datos.director}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="correo">
          <Form.Label>Correo</Form.Label>
          <Form.Control
            type="email"
            name="correo"
            placeholder="Ingrese el correo"
            value={datos.correo}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="telefono">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="text"
            name="telefono"
            placeholder="Ingrese el teléfono"
            value={datos.telefono}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="enlace">
          <Form.Label>Enlace</Form.Label>
          <Form.Control
            type="text"
            name="enlace"
            placeholder="Ingrese el enlace"
            value={datos.enlace}
            onChange={handleInputChange}
          />
        </Form.Group>
        
        <Form.Group className="mt-3">
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={handleCreate}>Crear Ente</Button>
            <Button variant="secondary" onClick={handleGet}>Consultar Ente</Button>
            <Button variant="warning" onClick={handleUpdate}>Actualizar Ente</Button>
            <Button variant="danger" onClick={handleDelete}>Eliminar Ente</Button>
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

export default Ente;
