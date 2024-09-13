import React, { useEffect, useState } from 'react';
import { Button, Form, Alert, Row, Col } from 'react-bootstrap';
import { evaluacionIntegral } from '../../../declarations/evaluacionIntegral'; // Asegúrate de importar la biblioteca correcta

const ResultEvaluador = () => {
  const [evaluacion, setEvaluacion] = useState({});
  const [idEvaluacion, setIdEvaluacion] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Función para obtener la evaluación
  const obtenerEvaluacion = async () => {
    try {
      const result = await evaluacionIntegral.getEvaluacion(parseInt(idEvaluacion));
      setEvaluacion(result);
      setMessage('Evaluación consultada con éxito.');
    } catch (error) {
      setMessage('Error al consultar la evaluación.');
      console.error('Error al consultar evaluación:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleIdEvaluacionChange = (e) => {
    setIdEvaluacion(e.target.value);
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
                type="text"
                readOnly
                value={evaluacion.resultado ? 'Evaluado' : 'No Evaluado'}
              />
            </Form.Group>

            <Form.Group controlId="retroalimentacion" className="mt-3">
              <Form.Label>Retroalimentación</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                readOnly
                value={evaluacion.retroalimentacion || 'No hay retroalimentación'}
              />
            </Form.Group>
          </div>
        )}
      </Form>
    </div>
  );
};

export default ResultEvaluador;
