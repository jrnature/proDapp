import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { roles } from '../../../declarations/roles/index';

const Rol = () => {
  const [idRol, setIdRol] = useState('');
  const [datos, setDatos] = useState({
    nombre: '',
    descripcion: '',
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatos(prevState => ({ ...prevState, [name]: value }));
  };

  const handleIdRolChange = (e) => {
    setIdRol(e.target.value);
  };

  const handleCreate = async () => {
    try {
      await roles.newRol(parseInt(idRol), datos);
      setMessage('Rol creado con éxito.');
    } catch (error) {
      setMessage('Error al crear el rol.');
    }
  };

  const handleGet = async () => {
    try {
      const result = await roles.getIdRol(parseInt(idRol));
      setDatos(result);
      setMessage('Rol consultado con éxito.');
    } catch (error) {
      setMessage('Error al consultar el rol.');
    }
  };

  const handleUpdate = async () => {
    try {
      await roles.updateRol(parseInt(idRol), datos);
      setMessage('Rol actualizado con éxito.');
    } catch (error) {
      setMessage('Error al actualizar el rol.');
    }
  };

  const handleDelete = async () => {
    try {
      await roles.deleteRol(parseInt(idRol));
      setMessage('Rol eliminado con éxito.');
      setDatos({
        nombre: '',
        descripcion: '',
      });
    } catch (error) {
      setMessage('Error al eliminar el rol.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Roles</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form>
        <Form.Group controlId="idRol">
          <Form.Label>ID del Rol</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingrese el ID del rol"
            value={idRol}
            onChange={handleIdRolChange}
          />
        </Form.Group>
        <Form.Group controlId="nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            placeholder="Ingrese el nombre del rol"
            value={datos.nombre}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="descripcion">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type="text"
            name="descripcion"
            placeholder="Ingrese la descripción del rol"
            value={datos.descripcion}
            onChange={handleInputChange}
          />
        </Form.Group>
        
        <Form.Group className="mt-3">
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={handleCreate}>Crear Rol</Button>
            <Button variant="secondary" onClick={handleGet}>Consultar Rol</Button>
            <Button variant="warning" onClick={handleUpdate}>Actualizar Rol</Button>
            <Button variant="danger" onClick={handleDelete}>Eliminar Rol</Button>
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

export default Rol;
