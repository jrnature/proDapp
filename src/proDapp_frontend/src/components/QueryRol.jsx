import React, { useState } from 'react';
import { Table, Spinner, Alert, Form, Button } from 'react-bootstrap';

const ViewRoles = ({ getRolesById }) => {
  const [idRol, setIdRol] = useState('');
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setIdRol(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await getRolesById(parseInt(idRol, 10));
      if (data) {
        setRole(data);
      } else {
        setError('Rol no encontrado.');
        setRole(null);
      }
    } catch (err) {
      setError('Error al obtener el rol.');
      console.error('Error al obtener el rol:', err);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Consultar Rol</h2>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group controlId="idRol">
          <Form.Label>ID del Rol</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingresa el ID del rol"
            value={idRol}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Consultar
        </Button>
      </Form>

      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">
          {error}
        </Alert>
      ) : role ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr key={role.idRol}>
              <td>{role.idRol}</td>
              <td>{role.nombre}</td>
              <td>{role.descripcion}</td>
            </tr>
          </tbody>
        </Table>
      ) : (
        <Alert variant="info">
          Ingresa un ID de rol para consultar
        </Alert>
      )}
    </div>
  );
};

export default ViewRoles;
