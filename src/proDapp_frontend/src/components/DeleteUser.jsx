import React, { useState } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap';

const EliminarUsuario = ({ deleteUsuario }) => {
  const [idUsuario, setIdUsuario] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setIdUsuario(e.target.value);
    setError(''); // Limpia el mensaje de error al cambiar el input
    setSuccess(''); // Limpia el mensaje de éxito al cambiar el input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpia el mensaje de error
    setSuccess(''); // Limpia el mensaje de éxito

    const id = parseInt(idUsuario, 10);

    // Verifica si el ID es un número válido
    if (isNaN(id) || id <= 0) {
      setError('ID inválido. Por favor, ingrese un número entero positivo para el ID.');
      return;
    }

    // Confirmación antes de eliminar
    if (!window.confirm(`¿Estás seguro de que quieres eliminar el usuario con ID ${id}?`)) {
      return;
    }

    try {
      // Llama a la función deleteUsuario
      await deleteUsuario(id);

      // Muestra un mensaje de éxito
      setSuccess('Usuario eliminado correctamente');
      setIdUsuario(''); // Limpia el campo de entrada
    } catch (error) {
      // Maneja errores y muestra un mensaje adecuado
      console.error('Error al eliminar el usuario:', error);
      setError('Error al eliminar el usuario. Intenta nuevamente.');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Eliminar Usuario</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="idUsuario">
          <Form.Label>ID del Usuario</Form.Label>
          <Form.Control
            type="number"
            placeholder="ID del Usuario"
            value={idUsuario}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="danger" type="submit">
          Eliminar
        </Button>
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        {success && <Alert variant="success" className="mt-3">{success}</Alert>}
      </Form>
    </Container>
  );
};

export default EliminarUsuario;
