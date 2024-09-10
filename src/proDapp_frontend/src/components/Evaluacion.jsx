import React, { useState, useEffect } from 'react';


// Componente principal de Evaluacion
const Evaluacion = () => {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [form, setForm] = useState({
    folio: '',
    ente: '',
    usuario: '',
    fechaInicio: '',
    fechaFin: '',
    evaluador: '',
    resultado: '',
    estado: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  // Función para obtener todas las evaluaciones
  const fetchEvaluaciones = async () => {
    // Simula la llamada al backend que devuelve las evaluaciones
    const data = [
      {
        folio: 1,
        ente: 101,
        usuario: 1001,
        fechaInicio: '2024-09-01',
        fechaFin: '2024-09-07',
        evaluador: 2001,
        resultado: 'Pendiente',
        estado: 1,
      },
      // Más evaluaciones aquí
    ];
    setEvaluaciones(data);
  };

  // Cargar evaluaciones al inicio
  useEffect(() => {
    fetchEvaluaciones();
  }, []);

  // Función para manejar los cambios en los formularios
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Función para crear o actualizar evaluaciones
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      // Lógica para actualizar una evaluación
      const updatedEvaluaciones = evaluaciones.map((evaluacion) =>
        evaluacion.folio === form.folio ? form : evaluacion
      );
      setEvaluaciones(updatedEvaluaciones);
      setIsEditing(false);
    } else {
      // Lógica para crear una nueva evaluación
      const newFolio = evaluaciones.length + 1;
      const newEvaluacion = { ...form, folio: newFolio };
      setEvaluaciones([...evaluaciones, newEvaluacion]);
    }
    setForm({
      folio: '',
      ente: '',
      usuario: '',
      fechaInicio: '',
      fechaFin: '',
      evaluador: '',
      resultado: '',
      estado: '',
    });
  };

  // Función para editar una evaluación
  const handleEdit = (folio) => {
    const evaluacion = evaluaciones.find((evaluacion) => evaluacion.folio === folio);
    setForm(evaluacion);
    setIsEditing(true);
  };

  // Función para eliminar una evaluación
  const handleDelete = (folio) => {
    const filteredEvaluaciones = evaluaciones.filter((evaluacion) => evaluacion.folio !== folio);
    setEvaluaciones(filteredEvaluaciones);
  };

  return (
    <div>
      <h2>Gestión de Evaluaciones</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="ente"
          placeholder="Ente"
          value={form.ente}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="usuario"
          placeholder="Usuario"
          value={form.usuario}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="fechaInicio"
          placeholder="Fecha de Inicio"
          value={form.fechaInicio}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="fechaFin"
          placeholder="Fecha de Fin"
          value={form.fechaFin}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="evaluador"
          placeholder="Evaluador"
          value={form.evaluador}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="resultado"
          placeholder="Resultado"
          value={form.resultado}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="estado"
          placeholder="Estado"
          value={form.estado}
          onChange={handleChange}
          required
        />
        <button type="submit">{isEditing ? 'Actualizar' : 'Crear'} Evaluación</button>
      </form>

      <h3>Lista de Evaluaciones</h3>
      <ul>
        {evaluaciones.map((evaluacion) => (
          <li key={evaluacion.folio}>
            <strong>Folio: {evaluacion.folio}</strong>, Ente: {evaluacion.ente}, Usuario: {evaluacion.usuario}, Fecha de Inicio: {evaluacion.fechaInicio}, Fecha de Fin: {evaluacion.fechaFin}, Evaluador: {evaluacion.evaluador}, Resultado: {evaluacion.resultado}, Estado: {evaluacion.estado}
            <button onClick={() => handleEdit(evaluacion.folio)}>Editar</button>
            <button onClick={() => handleDelete(evaluacion.folio)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Evaluacion;





// import React, { useState } from 'react';
// import { Button, Form, Alert } from 'react-bootstrap';
// import { evaluacion } from '../../../declarations/';

// const Evaluacion = () => {
//   const [folio, setFolio] = useState('');
//   const [datos, setDatos] = useState({
//     ente: 0,
//     usuario: 0,
//     fechaInicio: '',
//     fechaFin: '',
//     evaluador: 0,
//     resultado: 0,
//     estado: 0,
//   });
//   const [message, setMessage] = useState('');
//   const [response, setResponse] = useState('');

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setDatos(prevState => ({ ...prevState, [name]: value }));
//   };

//   const handleFolioChange = (e) => {
//     setFolio(e.target.value);
//   };

//   const handleCreate = async () => {
//     try {
//       await evaluacion.newEvaluacion(parseInt(folio), datos);
//       setMessage('Evaluación creada con éxito.');
//     } catch (error) {
//       setMessage('Error al crear la evaluación.');
//     }
//   };

//   const handleGet = async () => {
//     try {
//       const result = await evaluacion.getEvaluacion(parseInt(folio));
//       setDatos(result);
//       setMessage('Evaluación consultada con éxito.');
//     } catch (error) {
//       setMessage('Error al consultar la evaluación.');
//     }
//   };

//   const handleUpdate = async () => {
//     try {
//       await evaluacion.updateEvaluacion(parseInt(folio), datos);
//       setMessage('Evaluación actualizada con éxito.');
//     } catch (error) {
//       setMessage('Error al actualizar la evaluación.');
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await evaluacion.deleteEvaluacion(parseInt(folio));
//       setMessage('Evaluación eliminada con éxito.');
//       setDatos({
//         ente: 0,
//         usuario: 0,
//         fechaInicio: '',
//         fechaFin: '',
//         evaluador: 0,
//         resultado: 0,
//         estado: 0,
//       });
//     } catch (error) {
//       setMessage('Error al eliminar la evaluación.');
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Gestión de Evaluaciones</h2>
//       {message && <Alert variant="info">{message}</Alert>}
//       <Form>
//         <Form.Group controlId="folio">
//           <Form.Label>Folio</Form.Label>
//           <Form.Control
//             type="number"
//             placeholder="Ingrese el folio"
//             value={folio}
//             onChange={handleFolioChange}
//           />
//         </Form.Group>
//         <Form.Group controlId="ente">
//           <Form.Label>Ente</Form.Label>
//           <Form.Control
//             type="number"
//             name="ente"
//             placeholder="Ingrese el ente"
//             value={datos.ente}
//             onChange={handleInputChange}
//           />
//         </Form.Group>
//         <Form.Group controlId="usuario">
//           <Form.Label>Usuario</Form.Label>
//           <Form.Control
//             type="number"
//             name="usuario"
//             placeholder="Ingrese el usuario"
//             value={datos.usuario}
//             onChange={handleInputChange}
//           />
//         </Form.Group>
//         <Form.Group controlId="fechaInicio">
//           <Form.Label>Fecha de Inicio</Form.Label>
//           <Form.Control
//             type="text"
//             name="fechaInicio"
//             placeholder="Ingrese la fecha de inicio"
//             value={datos.fechaInicio}
//             onChange={handleInputChange}
//           />
//         </Form.Group>
//         <Form.Group controlId="fechaFin">
//           <Form.Label>Fecha de Fin</Form.Label>
//           <Form.Control
//             type="text"
//             name="fechaFin"
//             placeholder="Ingrese la fecha de fin"
//             value={datos.fechaFin}
//             onChange={handleInputChange}
//           />
//         </Form.Group>
//         <Form.Group controlId="evaluador">
//           <Form.Label>Evaluador</Form.Label>
//           <Form.Control
//             type="number"
//             name="evaluador"
//             placeholder="Ingrese el evaluador"
//             value={datos.evaluador}
//             onChange={handleInputChange}
//           />
//         </Form.Group>
//         <Form.Group controlId="resultado">
//           <Form.Label>Resultado</Form.Label>
//           <Form.Control
//             type="number"
//             name="resultado"
//             placeholder="Ingrese el resultado"
//             value={datos.resultado}
//             onChange={handleInputChange}
//           />
//         </Form.Group>
//         <Form.Group controlId="estado">
//           <Form.Label>Estado</Form.Label>
//           <Form.Control
//             type="number"
//             name="estado"
//             placeholder="Ingrese el estado"
//             value={datos.estado}
//             onChange={handleInputChange}
//           />
//         </Form.Group>
//         <Button variant="primary" onClick={handleCreate}>Crear Evaluación</Button>
//         <Button variant="secondary" className="ms-2" onClick={handleGet}>Consultar Evaluación</Button>
//         <Button variant="warning" className="ms-2" onClick={handleUpdate}>Actualizar Evaluación</Button>
//         <Button variant="danger" className="ms-2" onClick={handleDelete}>Eliminar Evaluación</Button>
//       </Form>
//       <div className="mt-4">
//         <h4>Resultado:</h4>
//         <pre>{JSON.stringify(datos, null, 2)}</pre>
//       </div>
//     </div>
//   );
// };

// export default Evaluacion;
