import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';

const DeleteRol = ({ deleteRol }) => {
  const [idRol, setIdRol] = useState('');

  const handleChange = (e) => {
    setIdRol(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = parseInt(idRol, 10);

      // Verifica si el ID es un número válido
      if (isNaN(id)) {
        alert('ID inválido. Por favor, ingrese un número entero para el ID.');
        return;
      }

      // Llama a la función deleteRol
      await deleteRol(id);

      // Muestra un mensaje de éxito
      alert('Rol eliminado correctamente');
      setIdRol(''); // Limpia el campo de entrada
    } catch (error) {
      // Maneja errores y muestra un mensaje adecuado
      console.error('Error al eliminar el rol:', error);
      alert('Error al eliminar el rol. Intenta nuevamente.');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Eliminar Rol</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="idRol">
          <Form.Label>ID del Rol</Form.Label>
          <Form.Control
            type="number"
            placeholder="ID del Rol"
            value={idRol}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="danger" type="submit">
          Eliminar
        </Button>
      </Form>
    </Container>
  );
};

export default DeleteRol;
