import React, { useEffect, useState } from 'react';
import { Button, Form, Alert, Row, Col } from 'react-bootstrap';
import { evaluacionIntegral } from '../../../declarations/evaluacionIntegral'; // Asegúrate de importar la biblioteca correcta

const AutoevaluacionView = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [idPregunta, setIdPregunta] = useState('');
  const [idRespuesta, setIdRespuesta] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Función para obtener preguntas
  const obtenerPreguntas = async () => {
    try {
      // Asume que hay una función que obtiene todas las preguntas
      const result = await evaluacionIntegral.getPregunta(); 
      setPreguntas(result);
    } catch (error) {
      setMessage('Error al cargar las preguntas.');
      console.error('Error al obtener preguntas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerPreguntas();
  }, []);

  // Función para obtener autoevaluación
  const obtenerAutoevaluacion = async () => {
    try {
      const result = await evaluacionIntegral.getAutoevaluacion(parseInt(idRespuesta));
      setRespuestas(result);
      setMessage('Autoevaluación consultada con éxito.');
    } catch (error) {
      setMessage('Error al consultar la autoevaluación.');
      console.error('Error al consultar autoevaluación:', error);
    }
  };

  const handleInputChange = (preguntaId, respuesta) => {
    setRespuestas(prevRespuestas => ({ ...prevRespuestas, [preguntaId]: respuesta }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      await evaluacionIntegral.updateAutoevaluacion(parseInt(idRespuesta), respuestas);
      setMessage('Autoevaluación actualizada correctamente.');
    } catch (error) {
      setMessage('Error al actualizar la autoevaluación.');
      console.error('Error al actualizar autoevaluación:', error);
    }
  };

  const handleIdPreguntaChange = (e) => {
    setIdPregunta(e.target.value);
  };

  const handleIdRespuestaChange = (e) => {
    setIdRespuesta(e.target.value);
  };

  const handleGetPregunta = async () => {
    try {
      const result = await evaluacionIntegral.getPregunta(parseInt(idPregunta));
      setPreguntas([result]); // Asume que la respuesta es una sola pregunta
      setMessage('Pregunta consultada con éxito.');
    } catch (error) {
      setMessage('Error al consultar la pregunta.');
      console.error('Error al consultar pregunta:', error);
    }
  };

  const handleGetAutoevaluacion = async () => {
    if (!idRespuesta) {
      setMessage('Ingrese un ID de respuesta para consultar.');
      return;
    }
    await obtenerAutoevaluacion();
  };

  if (loading) return <div className="text-center">Cargando...</div>;

  return (
    <div className="container mt-5">
      <h1 className="text-center">Autoevaluación</h1>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="idPregunta">
          <Form.Label>ID de la Pregunta</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingrese el ID de la pregunta"
            value={idPregunta}
            onChange={handleIdPreguntaChange}
          />
        </Form.Group>
        <Form.Group controlId="idRespuesta" className="mt-4">
          <Form.Label>ID de la Respuesta</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingrese el ID de la autoevaluación"
            value={idRespuesta}
            onChange={handleIdRespuestaChange}
          />
        </Form.Group>

        {preguntas.length > 0 && preguntas.map((pregunta) => (
          <div key={pregunta.id} className="form-group mt-3">
            <Form.Label>{pregunta.enunciado}</Form.Label>
            <Form.Control
              type="text"
              value={respuestas[pregunta.id] || ''}
              onChange={(e) => handleInputChange(pregunta.id, e.target.value)}
            />
          </div>
        ))}

        <Form.Group controlId="evidencia" className="mt-4">
          <Form.Label>Evidencia</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese evidencia"
            value={respuestas.evidencia || ''}
            onChange={(e) => setRespuestas(prevRespuestas => ({ ...prevRespuestas, evidencia: e.target.value }))}
          />
        </Form.Group>

        <Form.Group controlId="respondido" className="mt-4">
          <Form.Check
            type="checkbox"
            label="Respondido"
            checked={respuestas.respondido || false}
            onChange={(e) => setRespuestas(prevRespuestas => ({ ...prevRespuestas, respondido: e.target.checked }))}
          />
        </Form.Group>

        {/* Fila de botones */}
        <Row className="mt-4">
          <Col>
            <Button variant="secondary" className="w-100" onClick={handleGetPregunta}>
              Consultar Pregunta
            </Button>
          </Col>
          <Col>
            <Button variant="secondary" className="w-100" onClick={handleGetAutoevaluacion}>
              Consultar Autoevaluación
            </Button>
          </Col>
          <Col>
            <Button type="submit" variant="primary" className="w-100">
              Actualizar Autoevaluación
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AutoevaluacionView;
