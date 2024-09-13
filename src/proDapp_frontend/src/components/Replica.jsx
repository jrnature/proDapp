import React, { useState, useEffect } from 'react';
import { Button, Form, Alert, Row, Col } from 'react-bootstrap';
import { evaluacionIntegral } from '../../../declarations/evaluacionIntegral'; 

const Replica = () => {
  const [folio, setFolio] = useState('');
  const [replica, setReplica] = useState('');
  const [evidencia, setEvidencia] = useState('');
  const [evaluacion, setEvaluacion] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);


  const obtenerEvaluacion = async () => {
    setLoading(true);
    try {
     
      const result = await evaluacionIntegral.getAutoevaluacion(parseInt(folio, 10));
      setEvaluacion(result);
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
    const { id, value } = e.target;
    if (id === 'replica') setReplica(value);
    if (id === 'evidencia') setEvidencia(value);
  };

  // Función para enviar los datos de la réplica
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!folio) {
      setMessage('Ingrese un folio para consultar.');
      return;
    }
    try {
      // Aquí asumimos que hay un método para actualizar la autoevaluación con los datos de réplica
      await evaluacionIntegral.updateAutoevaluacion(parseInt(folio, 10), {
        ...evaluacion, // Mantén los datos existentes
        replica, // Actualiza con la nueva réplica
        evidenciaReplica: evidencia // Asigna la evidencia
      });
      setMessage('Réplica de evaluación creada correctamente.');
    } catch (error) {
      setMessage('Error al crear la réplica de la evaluación.');
      console.error('Error al crear réplica de evaluación:', error);
    }
  };

  const handleFolioChange = (e) => {
    setFolio(e.target.value);
  };

  const handleGetEvaluacion = async () => {
    if (!folio) {
      setMessage('Ingrese un folio para consultar.');
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
        <Form.Group controlId="folio">
          <Form.Label>Folio</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingrese el folio de la evaluación"
            value={folio}
            onChange={handleFolioChange}
          />
        </Form.Group>

        {evaluacion && (
          <div className="mt-4">
            <h4>Detalles de la Evaluación</h4>
            <p><strong>Usuario:</strong> {evaluacion.usuario}</p>
            <p><strong>Pregunta:</strong> {evaluacion.pregunta}</p>
            <p><strong>Resultado:</strong> {evaluacion.resultado}</p>
            <p><strong>Retroalimentación:</strong> {evaluacion.retroalimentacion}</p>
            {/* Agrega otros campos relevantes de la evaluación aquí */}
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

        <Row className="mt-4">
          <Col>
            <Button variant="secondary" className="w-100" onClick={handleGetEvaluacion}>
              Consultar Evaluación
            </Button>
          </Col>
          <Col>
            <Button type="submit" variant="primary" className="w-100">
              Crear Réplica
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Replica;
