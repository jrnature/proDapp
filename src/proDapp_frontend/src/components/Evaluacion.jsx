import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { evaluacion } from '../../../declarations/evaluacion/index';

const Evaluacion = () => {
  const [folio, setFolio] = useState('');
  const [datos, setDatos] = useState({
    ente: 0,
    usuario: 0,
    fechaInicio: '',
    fechaFin: '',
    evaluador: 0,
    resultado: 0,
    estado: 0,
  });
  const [datos1, setDatos1] = useState({
    ente: 0,
    usuario: 0,
    fechaInicio: '',
    fechaFin: '',
    evaluador: 0,
    resultado: 0,
    estado: 0,
  });
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatos(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFolioChange = (e) => {
    setFolio(e.target.value);
  };

  const handleCreate = async () => {
    datos1.ente=parseInt(datos.ente)
    datos1.usuario=parseInt(datos.usuario)
    datos1.resultado=parseInt(datos.resultado)
    datos1.evaluador=parseInt(datos.evaluador)
    datos1.estado=parseInt(datos.estado)
    datos1.fechaInicio=datos.fechaInicio
    datos1.fechaFin=datos.fechaFin
    try {
      await evaluacion.newEvaluacion(parseInt(folio), datos1);
      setMessage('Evaluación creada con éxito.');
    } catch (error) 
      {
      setMessage('Error al crear la evaluación.');
    }
  };

  const handleGet = async () => {
    try {
      const result = await evaluacion.getEvaluacion(parseInt(folio));
      // Verificar y convertir BigInt a string
      const datosConBigIntConvertidos = {
        ...result,
        ente: typeof result.ente === 'bigint' ? result.ente.toString() : result.ente,
        usuario: typeof result.usuario === 'bigint' ? result.usuario.toString() : result.usuario,
        evaluador: typeof result.evaluador === 'bigint' ? result.evaluador.toString() : result.evaluador,
        resultado: typeof result.resultado === 'bigint' ? result.resultado.toString() : result.resultado,
        estado: typeof result.estado === 'bigint' ? result.estado.toString() : result.estado,
      };
      setDatos(datosConBigIntConvertidos);
      setMessage('Evaluación consultada con éxito.');
    } catch (error) {
      setMessage('Error al consultar la evaluación.');
    }
  };
  const handleUpdate = async () => {
    try {
      // Convertir los valores a tipos apropiados
      const datosAEnviar = {
        ...datos,
        ente: parseInt(datos.ente),
        usuario: parseInt(datos.usuario),
        resultado: parseInt(datos.resultado),
        evaluador: parseInt(datos.evaluador),
        estado: parseInt(datos.estado),
        fechaInicio: datos.fechaInicio,
        fechaFin: datos.fechaFin,
      };
      
      await evaluacion.updateEvaluacion(parseInt(folio), datosAEnviar);
      setMessage('Evaluación actualizada con éxito.');
    } catch (error) {
      setMessage('Error al actualizar la evaluación.');
    }
  };

  const handleDelete = async () => {
    try {
      await evaluacion.deleteEvaluacion(parseInt(folio));
      setMessage('Evaluación eliminada con éxito.');
      setDatos({
        ente: 0,
        usuario: 0,
        fechaInicio: '',
        fechaFin: '',
        evaluador: 0,
        resultado: 0,
        estado: 0,
      });
    } catch (error) {
      setMessage('Error al eliminar la evaluación.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Evaluaciones</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form>
        <Form.Group controlId="folio">
          <Form.Label>Folio</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingrese el folio"
            value={folio}
            onChange={handleFolioChange}
          />
        </Form.Group>
        <Form.Group controlId="ente">
          <Form.Label>Ente</Form.Label>
          <Form.Control
            type="number"
            name="ente"
            placeholder="Ingrese el ente"
            value={datos.ente}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="usuario">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="number"
            name="usuario"
            placeholder="Ingrese el usuario"
            value={datos.usuario}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="fechaInicio">
          <Form.Label>Fecha de Inicio</Form.Label>
          <Form.Control
            type="text"
            name="fechaInicio"
            placeholder="Ingrese la fecha de inicio"
            value={datos.fechaInicio}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="fechaFin">
          <Form.Label>Fecha de Fin</Form.Label>
          <Form.Control
            type="text"
            name="fechaFin"
            placeholder="Ingrese la fecha de fin"
            value={datos.fechaFin}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="evaluador">
          <Form.Label>Evaluador</Form.Label>
          <Form.Control
            type="number"
            name="evaluador"
            placeholder="Ingrese el evaluador"
            value={datos.evaluador}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="resultado">
          <Form.Label>Resultado</Form.Label>
          <Form.Control
            type="number"
            name="resultado"
            placeholder="Ingrese el resultado"
            value={datos.resultado}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="estado">
          <Form.Label>Estado</Form.Label>
          <Form.Control
            type="number"
            name="estado"
            placeholder="Ingrese el estado"
            value={datos.estado}
            onChange={handleInputChange}
          />
          <br />
        </Form.Group>

        <Form.Group className="mt-3">
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={handleCreate}>Crear Evaluación</Button>
            <Button variant="secondary" onClick={handleGet}>Consultar Evaluación</Button>
            <Button variant="warning" onClick={handleUpdate}>Actualizar Evaluación</Button>
            <Button variant="danger" onClick={handleDelete}>Eliminar Evaluación</Button>
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

export default Evaluacion;
