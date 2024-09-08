// import React, { useState } from 'react';

// const DeleteEnte = ({ deleteEnte }) => {
//   const [idEnte, setIdEnte] = useState('');

//   const handleChange = (e) => {
//     setIdEnte(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const id = parseInt(idEnte);

//       if (isNaN(id)) {
//         alert('ID inválido. Por favor, ingrese un número entero para el ID.');
//         return;
//       }

//       const result = await deleteEnte(id);
//       console.log('Resultado de la eliminación:', result); // Para depurar

//       if (result) {
//         alert('Ente eliminado correctamente');
//       } else {
//         alert('No se pudo eliminar el ente. Verifica el ID.');
//       }

//       // Limpiar campo de entrada después de eliminar
//       setIdEnte('');
//     } catch (error) {
//       console.error('Error al eliminar el ente:', error);
//       alert('Error al eliminar el ente. Intenta nuevamente.');
//     }
//   };

//   return (
//     <div>
//       <h2>Eliminar Ente</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="number"
//           name="idEnte"
//           placeholder="ID del Ente"
//           value={idEnte}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Eliminar</button>
//       </form>
//     </div>
//   );
// };

// export default DeleteEnte;


import React, { useState } from 'react';

const DeleteEnte = ({ deleteEnte }) => {
  const [idEnte, setIdEnte] = useState('');

  const handleChange = (e) => {
    setIdEnte(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = parseInt(idEnte, 10);

      if (isNaN(id)) {
        alert('ID inválido. Por favor, ingrese un número entero para el ID.');
        return;
      }

      const result = await deleteEnte(id);

      if (result) {
        alert('Ente eliminado correctamente');
      } else {
        alert('No se pudo eliminar el ente. Verifica el ID.');
      }

      setIdEnte('');
    } catch (error) {
      console.error('Error al eliminar el ente:', error);
      alert('Error al eliminar el ente. Intenta nuevamente.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Eliminar Ente</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="idEnte" className="form-label">ID del Ente</label>
          <input
            type="number"
            name="idEnte"
            className="form-control"
            placeholder="ID del Ente"
            value={idEnte}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-danger">Eliminar</button>
      </form>
    </div>
  );
};

export default DeleteEnte;
