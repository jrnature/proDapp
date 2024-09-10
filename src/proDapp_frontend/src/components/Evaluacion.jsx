// import React, { useState, useEffect } from 'react';

// // Componente principal de Evaluacion
// const Evaluacion = () => {
//   const [evaluaciones, setEvaluaciones] = useState([]);
//   const [form, setForm] = useState({
//     folio: '',
//     ente: '',
//     usuario: '',
//     fechaInicio: '',
//     fechaFin: '',
//     evaluador: '',
//     resultado: '',
//     estado: '',
//   });
//   const [isEditing, setIsEditing] = useState(false);

//   // Función para obtener todas las evaluaciones
//   const fetchEvaluaciones = async () => {
//     // Simula la llamada al backend que devuelve las evaluaciones
//     const data = [
//       {
//         folio: 1,
//         ente: 101,
//         usuario: 1001,
//         fechaInicio: '2024-09-01',
//         fechaFin: '2024-09-07',
//         evaluador: 2001,
//         resultado: 'Pendiente',
//         estado: 1,
//       },
//       // Más evaluaciones aquí
//     ];
//     setEvaluaciones(data);
//   };

//   // Cargar evaluaciones al inicio
//   useEffect(() => {
//     fetchEvaluaciones();
//   }, []);

//   // Función para manejar los cambios en los formularios
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Función para crear o actualizar evaluaciones
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isEditing) {
//       // Lógica para actualizar una evaluación
//       const updatedEvaluaciones = evaluaciones.map((evaluacion) =>
//         evaluacion.folio === form.folio ? form : evaluacion
//       );
//       setEvaluaciones(updatedEvaluaciones);
//       setIsEditing(false);
//     } else {
//       // Lógica para crear una nueva evaluación
//       const newFolio = evaluaciones.length + 1;
//       const newEvaluacion = { ...form, folio: newFolio };
//       setEvaluaciones([...evaluaciones, newEvaluacion]);
//     }
//     setForm({
//       folio: '',
//       ente: '',
//       usuario: '',
//       fechaInicio: '',
//       fechaFin: '',
//       evaluador: '',
//       resultado: '',
//       estado: '',
//     });
//   };

//   // Función para editar una evaluación
//   const handleEdit = (folio) => {
//     const evaluacion = evaluaciones.find((evaluacion) => evaluacion.folio === folio);
//     setForm(evaluacion);
//     setIsEditing(true);
//   };

//   // Función para eliminar una evaluación
//   const handleDelete = (folio) => {
//     const filteredEvaluaciones = evaluaciones.filter((evaluacion) => evaluacion.folio !== folio);
//     setEvaluaciones(filteredEvaluaciones);
//   };

//   return (
//     <div>
//       <h2>Gestión de Evaluaciones</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="ente"
//           placeholder="Ente"
//           value={form.ente}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="usuario"
//           placeholder="Usuario"
//           value={form.usuario}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="fechaInicio"
//           placeholder="Fecha de Inicio"
//           value={form.fechaInicio}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="fechaFin"
//           placeholder="Fecha de Fin"
//           value={form.fechaFin}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="evaluador"
//           placeholder="Evaluador"
//           value={form.evaluador}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="resultado"
//           placeholder="Resultado"
//           value={form.resultado}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="number"
//           name="estado"
//           placeholder="Estado"
//           value={form.estado}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">{isEditing ? 'Actualizar' : 'Crear'} Evaluación</button>
//       </form>

//       <h3>Lista de Evaluaciones</h3>
//       <ul>
//         {evaluaciones.map((evaluacion) => (
//           <li key={evaluacion.folio}>
//             <strong>Folio: {evaluacion.folio}</strong>, Ente: {evaluacion.ente}, Usuario: {evaluacion.usuario}, Fecha de Inicio: {evaluacion.fechaInicio}, Fecha de Fin: {evaluacion.fechaFin}, Evaluador: {evaluacion.evaluador}, Resultado: {evaluacion.resultado}, Estado: {evaluacion.estado}
//             <button onClick={() => handleEdit(evaluacion.folio)}>Editar</button>
//             <button onClick={() => handleDelete(evaluacion.folio)}>Eliminar</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Evaluacion;
import React, { useState, useEffect } from 'react';

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
    <div className="container mt-4">
      <h2 className="mb-4">Gestión de Evaluaciones</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label" htmlFor="ente">Ente</label>
            <input
              type="text"
              id="ente"
              name="ente"
              className="form-control"
              placeholder="Ente"
              value={form.ente}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label" htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              className="form-control"
              placeholder="Usuario"
              value={form.usuario}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label" htmlFor="fechaInicio">Fecha de Inicio</label>
            <input
              type="date"
              id="fechaInicio"
              name="fechaInicio"
              className="form-control"
              value={form.fechaInicio}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label" htmlFor="fechaFin">Fecha de Fin</label>
            <input
              type="date"
              id="fechaFin"
              name="fechaFin"
              className="form-control"
              value={form.fechaFin}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label" htmlFor="evaluador">Evaluador</label>
            <input
              type="text"
              id="evaluador"
              name="evaluador"
              className="form-control"
              placeholder="Evaluador"
              value={form.evaluador}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label" htmlFor="resultado">Resultado</label>
            <input
              type="text"
              id="resultado"
              name="resultado"
              className="form-control"
              placeholder="Resultado"
              value={form.resultado}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label" htmlFor="estado">Estado</label>
            <input
              type="number"
              id="estado"
              name="estado"
              className="form-control"
              placeholder="Estado"
              value={form.estado}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-12 mb-3">
            <button type="submit" className="btn btn-primary">
              {isEditing ? 'Actualizar' : 'Crear'} Evaluación
            </button>
          </div>
        </div>
      </form>

      <h3 className="mb-3">Lista de Evaluaciones</h3>
      <ul className="list-group">
        {evaluaciones.map((evaluacion) => (
          <li key={evaluacion.folio} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>Folio: {evaluacion.folio}</strong>, Ente: {evaluacion.ente}, Usuario: {evaluacion.usuario}, Fecha de Inicio: {evaluacion.fechaInicio}, Fecha de Fin: {evaluacion.fechaFin}, Evaluador: {evaluacion.evaluador}, Resultado: {evaluacion.resultado}, Estado: {evaluacion.estado}
            </div>
            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => handleEdit(evaluacion.folio)}
              >
                Editar
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(evaluacion.folio)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Evaluacion;
