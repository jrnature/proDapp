import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';

const DeleteRole = ({ deleteRole }) => {
  const [idRol, setIdRol] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await deleteRole(parseInt(idRol, 10));
      setError('');
      alert('Rol eliminado correctamente');
    } catch (err) {
      setError('Error al eliminar el rol');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Eliminar Rol</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>ID del Rol</Form.Label>
          <Form.Control
            type="number"
            value={idRol}
            onChange={(e) => setIdRol(e.target.value)}
            placeholder="Ingresa el ID del rol"
            required
          />
        </Form.Group>

        <Button type="submit" variant="danger">Eliminar Rol</Button>
      </Form>
    </div>
  );
};

export default DeleteRole;
