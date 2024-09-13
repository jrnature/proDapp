import React, { useState } from 'react';
import { Button, Form, Alert, Row, Col } from 'react-bootstrap';
import { evaluacionIntegral } from '../../../declarations/evaluacionIntegral';

const Replica = () => {
  const [idRespuesta, setIdRespuesta] = useState('');
  const [replica, setReplica] = useState('');
  const [evidencia, setEvidencia] = useState('');
  const [usuarioReplica, setUsuarioReplica] = useState('');
  const [replicado, setReplicado] = useState(false);
  const [evaluacion, setEvaluacion] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Función para obtener la evaluación
  const obtenerEvaluacion = async () => {
    setLoading(true);
    try {
      const result = await evaluacionIntegral.getAutoevaluacion(parseInt(idRespuesta, 10));
      setEvaluacion(result);
      // Seteamos los campos con los valores recibidos de la evaluación
      setReplica(result.replica || '');
      setEvidencia(result.evidenciaReplica || '');
      setUsuarioReplica(result.usuarioReplica || '');
      setReplicado(result.replicado || false);
      setMessage('Evaluación consultada con éxito.');
    } catch (error) {
      setMessage('Error al consultar la evaluación.');
      console.error('Error al consultar evaluación:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar el cambio en los campos del formulario
  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (id === 'replica') setReplica(value);
    if (id === 'evidencia') setEvidencia(value);
    if (id === 'usuarioReplica') setUsuarioReplica(value);
    if (id === 'replicado') setReplicado(checked); // Para checkbox
  };

  // Función para enviar los datos de la réplica (actualización)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idRespuesta) {
      setMessage('Ingrese un ID de respuesta para consultar.');
      return;
    }
    try {
      // Actualizar los datos de la evaluación con los nuevos datos de réplica
      await evaluacionIntegral.updateAutoevaluacion(parseInt(idRespuesta, 10), {
        ...evaluacion, // Mantener los datos existentes
        replica,
        evidenciaReplica: evidencia,
        usuarioReplica: parseInt(usuarioReplica, 10),
        replicado
      });
      setMessage('Réplica de evaluación actualizada correctamente.');
    } catch (error) {
      setMessage('Error al actualizar la réplica de la evaluación.');
      console.error('Error al actualizar réplica de evaluación:', error);
    }
  };

  const handleIdRespuestaChange = (e) => {
    setIdRespuesta(e.target.value);
  };

  const handleGetEvaluacion = async () => {
    if (!idRespuesta) {
      setMessage('Ingrese un ID de respuesta para consultar.');
      return;
    }
    await obtenerEvaluacion();
  };

  if (loading) return <div className="text-center">Cargando...</div>;

  return (
    <div className="container mt-5">
      <h1 className="text-center">Réplica de Evaluación</h1>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="idRespuesta">
          <Form.Label>ID de Respuesta</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingrese el ID de la respuesta"
            value={idRespuesta}
            onChange={handleIdRespuestaChange}
          />
        </Form.Group>

        {evaluacion && (
          <div className="mt-4">
            <h4>Detalles de la Auto Evaluación</h4>
            <p><strong>Retroalimentación:</strong> {evaluacion.retroalimentacion}</p>
          </div>
        )}

        <Form.Group controlId="replica" className="mt-4">
          <Form.Label>Réplica</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese la réplica"
            value={replica}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="evidencia" className="mt-4">
          <Form.Label>Evidencia</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese la evidencia"
            value={evidencia}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="usuarioReplica" className="mt-4">
          <Form.Label>Usuario Réplica</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingrese el ID del usuario que realiza la réplica"
            value={usuarioReplica}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="replicado" className="mt-4">
          <Form.Check
            type="checkbox"
            label="Replicado"
            checked={replicado}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Row className="mt-4">
          <Col>
            <Button variant="secondary" className="w-100" onClick={handleGetEvaluacion}>
              Consultar Evaluación
            </Button>
          </Col>
          <Col>
            <Button type="submit" variant="primary" className="w-100">
              Actualizar Réplica
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Replica;
