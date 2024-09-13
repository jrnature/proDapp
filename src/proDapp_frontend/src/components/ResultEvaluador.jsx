import React, { useState } from 'react';
import { Button, Form, Alert, Row, Col } from 'react-bootstrap';
import { evaluacionIntegral } from '../../../declarations/evaluacionIntegral'; 

const ResultEvaluador = () => {
  const [evaluacion, setEvaluacion] = useState(null);
  const [idEvaluacion, setIdEvaluacion] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Función para obtener la autoevaluación
  const obtenerEvaluacion = async () => {
    setLoading(true);
    try {
      const result = await evaluacionIntegral.getAutoevaluacion(parseInt(idEvaluacion, 10));
      setEvaluacion(result);
      setMessage('Evaluación consultada con éxito.');
    } catch (error) {
      setMessage('Error al consultar la evaluación.');
      console.error('Error al consultar evaluación:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para actualizar la evaluación
  const actualizarEvaluacion = async () => {
    setLoading(true);
    try {
      await evaluacionIntegral.updateAutoevaluacion(parseInt(idEvaluacion, 10), evaluacion);
      setMessage('Evaluación actualizada correctamente.');
    } catch (error) {
      setMessage('Error al actualizar la evaluación.');
      console.error('Error al actualizar evaluación:', error);
    } finally {
      setLoading(false);
    }
  };

  // Maneja cambios en el campo ID de Evaluación
  const handleIdEvaluacionChange = (e) => {
    setIdEvaluacion(e.target.value);
  };

  // Maneja cambios en el campo Resultado
  const handleResultadoChange = (e) => {
    setEvaluacion({
      ...evaluacion,
      resultado: parseInt(e.target.value, 10) || 0, // Convertir a número, o 0 si no es válido
    });
  };

  // Maneja cambios en el campo Retroalimentación
  const handleRetroalimentacionChange = (e) => {
    setEvaluacion({
      ...evaluacion,
      retroalimentacion: e.target.value,
    });
  };

  const handleGetEvaluacion = async () => {
    if (!idEvaluacion) {
      setMessage('Ingrese un ID de evaluación para consultar.');
      return;
    }
    await obtenerEvaluacion();
  };

  if (loading) return <div className="text-center">Cargando...</div>;

  return (
    <div className="container mt-5">
      <h1 className="text-center">Resultado del Evaluador</h1>
      {message && <Alert variant="info">{message}</Alert>}
      <Form>
        <Form.Group controlId="idEvaluacion">
          <Form.Label>ID de la Evaluación</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingrese el ID de la evaluación"
            value={idEvaluacion}
            onChange={handleIdEvaluacionChange}
          />
        </Form.Group>

        <Row className="mt-4">
          <Col>
            <Button variant="secondary" className="w-100" onClick={handleGetEvaluacion}>
              Consultar Evaluación
            </Button>
          </Col>
        </Row>

        {evaluacion && (
          <div className="mt-4">
            <h4>Detalles de Evaluación</h4>
            <Form.Group controlId="resultado">
              <Form.Label>Resultado</Form.Label>
              <Form.Control
                type="number" // Asegura que solo se puedan ingresar números
                value={evaluacion.resultado}
                onChange={handleResultadoChange}
              />
            </Form.Group>

            <Form.Group controlId="retroalimentacion" className="mt-3">
              <Form.Label>Retroalimentación</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={evaluacion.retroalimentacion}
                onChange={handleRetroalimentacionChange}
              />
            </Form.Group>

            {/* Botón de actualizar */}
            <Row className="mt-4">
              <Col>
                <Button variant="primary" className="w-100" onClick={actualizarEvaluacion}>
                  Actualizar Evaluación
                </Button>
              </Col>
            </Row>
          </div>
        )}
      </Form>
    </div>
  );
};

export default ResultEvaluador;
