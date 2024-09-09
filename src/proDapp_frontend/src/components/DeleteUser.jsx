import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';

const DeleteUser = ({ deleteUser }) => {
  const [idUsuario, setIdUsuario] = useState('');

  const handleChange = (e) => {
    setIdUsuario(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = parseInt(idUsuario, 10);

      // Verifica si el ID es un número válido
      if (isNaN(id)) {
        alert('ID inválido. Por favor, ingrese un número entero para el ID.');
        return;
      }

      // Asegúrate de que deleteUser sea una función
      if (typeof deleteUser !== 'function') {
        throw new Error('La función deleteUser no está definida correctamente');
      }

      // Llama a la función deleteUser
      await deleteUser(id);

      // Muestra un mensaje de éxito
      alert('Usuario eliminado correctamente');
      setIdUsuario(''); // Limpia el campo de entrada
    } catch (error) {
      // Maneja errores y muestra un mensaje adecuado
      console.error('Error al eliminar el usuario:', error);
      alert('Error al eliminar el usuario. Intenta nuevamente.');
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
      </Form>
    </Container>
  );
};

export default DeleteUser;
