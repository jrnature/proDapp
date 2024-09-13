import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { evaluacionIntegral } from '../../../declarations/evaluacionIntegral';

const Pregunta = () => {
  const [idPregunta, setIdPregunta] = useState('');
  const [datos, setDatos] = useState({
    numero: 0,
    aspecto: 0,
    numAspecto: 0,
    evidencia: false,
    activo: false,
    version: 0,
    enunciado:'',
  });
  const [message, setMessage] = useState('');
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDatos(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleIdChange = (e) => {
    setIdPregunta(e.target.value);
  };

  const handleCreate = async () => {
    try {
      await evaluacionIntegral.newPregunta(parseInt(idPregunta), {
        numero: parseInt(datos.numero),
        aspecto: parseInt(datos.aspecto),
        numAspecto: parseInt(datos.numAspecto),
        evidencia: datos.evidencia,
        activo: datos.activo,
        version: parseInt(datos.version),
        enunciado: datos.enunciado,
      });
      setMessage('Pregunta creada con éxito.');
    } catch (error) {
      setMessage('Error al crear la pregunta.');
    }
  };

  const convertBigIntToNumber = (obj) => {
    if (typeof obj === 'bigint') {
      return Number(obj);
    } else if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          obj[key] = convertBigIntToNumber(obj[key]);
        }
      }
    }
    return obj;
  };
  
  
  const handleGet = async () => {
    try {
      console.log('ID de Pregunta:', idPregunta);
      const result = await evaluacionIntegral.getPregunta(parseInt(idPregunta));
      console.log('Resultado de la Consulta:', result);
  
      // Convierte los BigInt a Number
      const convertedResult = convertBigIntToNumber(result);
  
      setDatos(convertedResult);
      setMessage('Pregunta consultada con éxito.');
    } catch (error) {
      console.error('Error al consultar la pregunta:', error);
      setMessage('Error al consultar la pregunta.');
    }
  };


  const handleUpdate = async () => {
    try {
      await evaluacionIntegral.updatePreguntas(parseInt(idPregunta), {
        numero: parseInt(datos.numero),
        aspecto: parseInt(datos.aspecto),
        numAspecto: parseInt(datos.numAspecto),
        evidencia: datos.evidencia,
        activo: datos.activo,
        version: parseInt(datos.version),
        enunciado: datos.enunciado,

      });
      setMessage('Pregunta actualizada con éxito.');
    } catch (error) {
      setMessage('Error al actualizar la pregunta.');
    }
  };

  const handleDelete = async () => {
    try {
      await evaluacionIntegral.deleteUsuario(parseInt(idPregunta));
      setMessage('Pregunta eliminada con éxito.');
      setDatos({
        numero: 0,
        aspecto: 0,
        numAspecto: 0,
        evidencia: false,
        activo: false,
        version: 0,
      });
    } catch (error) {
      setMessage('Error al eliminar la pregunta.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Preguntas</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form>
        <Form.Group controlId="idPregunta">
          <Form.Label>ID de la Pregunta</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingrese el ID de la pregunta"
            value={idPregunta}
            onChange={handleIdChange}
          />
        </Form.Group>
        <Form.Group controlId="numero">
          <Form.Label>Número</Form.Label>
          <Form.Control
            type="number"
            name="numero"
            placeholder="Ingrese el número"
            value={datos.numero}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="aspecto">
          <Form.Label>Aspecto</Form.Label>
          <Form.Control
            type="number"
            name="aspecto"
            placeholder="Ingrese el aspecto"
            value={datos.aspecto}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="numAspecto">
          <Form.Label>Número de Aspecto</Form.Label>
          <Form.Control
            type="number"
            name="numAspecto"
            placeholder="Ingrese el número de aspecto"
            value={datos.numAspecto}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="evidencia">
          <Form.Check
            type="checkbox"
            name="evidencia"
            label="Evidencia"
            checked={datos.evidencia}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="activo">
          <Form.Check
            type="checkbox"
            name="activo"
            label="Activo"
            checked={datos.activo}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="version">
          <Form.Label>Versión</Form.Label>
          <Form.Control
            type="number"
            name="version"
            placeholder="Ingrese la versión"
            value={datos.version}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="enunciado">
          <Form.Label>Enunciado de la pregunta</Form.Label>
          <Form.Control
            type="text"
            name="enunciado"
            placeholder="Ingrese el enunciado de la pregunta"
            value={datos.enunciado}
            onChange={handleInputChange}
          />
        </Form.Group>
        <br />
        <Form.Group className="mt-3">
          <div className="d-grid gap-2">
        <Button variant="primary" onClick={handleCreate}>Crear Pregunta</Button>
        <Button variant="secondary" className="ms-2" onClick={handleGet}>Consultar Pregunta</Button>
        <Button variant="warning" className="ms-2" onClick={handleUpdate}>Actualizar Pregunta</Button>
        <Button variant="danger" className="ms-2" onClick={handleDelete}>Eliminar Pregunta</Button>
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

export default Pregunta;
