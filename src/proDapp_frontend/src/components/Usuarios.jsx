import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { usuario } from '../../../declarations/usuario/index';

const Usuario = () => {
  const [idUsuario, setIdUsuario] = useState('');
  const [datos, setDatos] = useState({
    nombre: '',
    puesto: '',
    ente: '',
    correo: '',
    rol: '',
    telefono: '',
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatos(prevState => ({ ...prevState, [name]: value }));
  };

  const handleIdUsuarioChange = (e) => {
    setIdUsuario(e.target.value);
  };

  // Función para serializar datos, manejando BigInt como string
  const serializeData = (data) => {
    return JSON.stringify(data, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    );
  };

  const handleCreate = async () => {
    try {
      await usuario.newUsuario(BigInt(idUsuario), {
        ...datos,
        ente: BigInt(datos.ente),
        rol: BigInt(datos.rol)
      });
      setMessage('Usuario creado con éxito.');
    } catch (error) {
      setMessage('Error al crear el usuario.');
    }
  };

  const handleGet = async () => {
    try {
      const result = await usuario.getUsuario(BigInt(idUsuario));
      setDatos({
        ...result,
        ente: result.ente.toString(),
        rol: result.rol.toString(),
      });
      setMessage('Usuario consultado con éxito.');
    } catch (error) {
      setMessage('Error al consultar el usuario.');
    }
  };

  const handleUpdate = async () => {
    try {
      await usuario.updateUsuario(BigInt(idUsuario), {
        ...datos,
        ente: BigInt(datos.ente),
        rol: BigInt(datos.rol)
      });
      setMessage('Usuario actualizado con éxito.');
    } catch (error) {
      setMessage('Error al actualizar el usuario.');
    }
  };

  const handleDelete = async () => {
    try {
      await usuario.deleteUsuario(BigInt(idUsuario));
      setMessage('Usuario eliminado con éxito.');
      setDatos({
        nombre: '',
        puesto: '',
        ente: '',
        correo: '',
        rol: '',
        telefono: '',
        username: '',
        password: ''
      });
    } catch (error) {
      setMessage('Error al eliminar el usuario.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Usuarios</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form>
        <Form.Group controlId="idUsuario">
          <Form.Label>ID del Usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el ID del usuario"
            value={idUsuario}
            onChange={handleIdUsuarioChange}
          />
        </Form.Group>
        <Form.Group controlId="nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            placeholder="Ingrese el nombre del usuario"
            value={datos.nombre}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="puesto">
          <Form.Label>Puesto</Form.Label>
          <Form.Control
            type="text"
            name="puesto"
            placeholder="Ingrese el puesto del usuario"
            value={datos.puesto}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="ente">
          <Form.Label>Ente</Form.Label>
          <Form.Control
            type="text"
            name="ente"
            placeholder="Ingrese el ente del usuario"
            value={datos.ente}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="correo">
          <Form.Label>Correo</Form.Label>
          <Form.Control
            type="email"
            name="correo"
            placeholder="Ingrese el correo del usuario"
            value={datos.correo}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="rol">
          <Form.Label>Rol</Form.Label>
          <Form.Control
            type="text"
            name="rol"
            placeholder="Ingrese el rol del usuario"
            value={datos.rol}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="telefono">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="text"
            name="telefono"
            placeholder="Ingrese el teléfono del usuario"
            value={datos.telefono}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Ingrese el username del usuario"
            value={datos.username}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Ingrese el password del usuario"
            value={datos.password}
            onChange={handleInputChange}
          />
        </Form.Group>
        
        <Form.Group className="mt-3">
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={handleCreate}>Crear Usuario</Button>
            <Button variant="secondary" onClick={handleGet}>Consultar Usuario</Button>
            <Button variant="warning" onClick={handleUpdate}>Actualizar Usuario</Button>
            <Button variant="danger" onClick={handleDelete}>Eliminar Usuario</Button>
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

export default Usuario;
