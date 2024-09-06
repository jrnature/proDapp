// import React, { useState } from 'react';

// const CreateEnte = ({ createEnte }) => {
//     const [ente, setEnte] = useState({
//         nombre: '',
//         director: '',
//         correo: '',
//         telefono: '',
//         enlace: '',
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEnte(prevState => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const idEnte = Math.floor(Math.random() * 1000); // Generar un ID temporal
//             await createEnte(idEnte, ente);
//             alert('Ente creado correctamente');
//             // Opcional: Limpiar el formulario después de enviar
//             setEnte({
//                 nombre: '',
//                 director: '',
//                 correo: '',
//                 telefono: '',
//                 enlace: '',
//             });
//         } catch (error) {
//             console.error('Error al crear el ente:', error);
//             // Opcional: Mostrar un mensaje de error en la interfaz
//             alert('Hubo un error al crear el ente. Por favor, intenta de nuevo.');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 name="nombre"
//                 placeholder="Nombre"
//                 value={ente.nombre}
//                 onChange={handleChange}
//                 required
//             />
//             <input
//                 type="text"
//                 name="director"
//                 placeholder="Director"
//                 value={ente.director}
//                 onChange={handleChange}
//                 required
//             />
//             <input
//                 type="email"
//                 name="correo"
//                 placeholder="Correo"
//                 value={ente.correo}
//                 onChange={handleChange}
//                 required
//             />
//             <input
//                 type="text"
//                 name="telefono"
//                 placeholder="Teléfono"
//                 value={ente.telefono}
//                 onChange={handleChange}
//                 required
//             />
//             <input
//                 type="text"
//                 name="enlace"
//                 placeholder="Enlace"
//                 value={ente.enlace}
//                 onChange={handleChange}
//                 required
//             />
//             <button type="submit">Crear Ente</button>
//         </form>
//     );
// };

// export default CreateEnte;

// import React, { useState } from 'react';


// const CreateEnte = ({ createEnte }) => {
//   const [ente, setEnte] = useState({
//     idEnte: '',
//     nombre: '',
//     director: '',
//     correo: '',
//     telefono: '',
//     enlace: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEnte(prevState => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Convertir idEnte a número entero
//       const idEnte = parseInt(ente.idEnte, 10);
      
//       // Verificar si idEnte es un número válido
//       if (isNaN(idEnte)) {
//         alert('ID inválido. Por favor, ingrese un número entero para el ID.');
//         return;
//       }

//       // Llamada a la función createEnte pasando el ID y los datos del ente
//       const result = await createEnte(idEnte, {
//         nombre: ente.nombre,
//         director: ente.director,
//         correo: ente.correo,
//         telefono: ente.telefono,
//         enlace: ente.enlace,
//       });

//       // Depurar el resultado
//       console.log('Resultado de createEnte:', result);

//       // Verificar si el resultado es un ID válido
//       if (result !== null && result !== undefined && Number.isInteger(result)) {
//         alert(`Ente creado correctamente con ID: ${result}`);
//       } else {
//         alert('No se recibió un ID válido. El ente podría no haber sido creado correctamente.');
//       }

//       // Limpiar el formulario después de enviar
//       setEnte({
//         idEnte: '',
//         nombre: '',
//         director: '',
//         correo: '',
//         telefono: '',
//         enlace: '',
//       });
//     } catch (error) {
//       console.error('Error al crear el ente:', error);
//       alert('Hubo un error al crear el ente. Por favor, intenta de nuevo.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="number"
//         name="idEnte"
//         placeholder="ID del Ente"
//         value={ente.idEnte}
//         onChange={handleChange}
//         required
//       />
//       <input
//         type="text"
//         name="nombre"
//         placeholder="Nombre"
//         value={ente.nombre}
//         onChange={handleChange}
//         required
//       />
//       <input
//         type="text"
//         name="director"
//         placeholder="Director"
//         value={ente.director}
//         onChange={handleChange}
//         required
//       />
//       <input
//         type="email"
//         name="correo"
//         placeholder="Correo"
//         value={ente.correo}
//         onChange={handleChange}
//         required
//       />
//       <input
//         type="text"
//         name="telefono"
//         placeholder="Teléfono"
//         value={ente.telefono}
//         onChange={handleChange}
//         required
//       />
//       <input
//         type="text"
//         name="enlace"
//         placeholder="Enlace"
//         value={ente.enlace}
//         onChange={handleChange}
//         required
//       />
//       <button type="submit">Crear Ente</button>
//     </form>
//   );
// };

// export default CreateEnte;

import React, { useState } from 'react';

const CreateEnte = ({ createEnte }) => {
  const [ente, setEnte] = useState({
    idEnte: '',
    nombre: '',
    director: '',
    correo: '',
    telefono: '',
    enlace: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEnte(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convertir idEnte a número entero
      const idEnte = parseInt(ente.idEnte, 10);
      
      // Verificar si idEnte es un número válido
      if (isNaN(idEnte)) {
        alert('ID inválido. Por favor, ingrese un número entero para el ID.');
        return;
      }

      // Llamada a la función createEnte pasando el ID y los datos del ente
      const result = await createEnte(idEnte, {
        nombre: ente.nombre,
        director: ente.director,
        correo: ente.correo,
        telefono: ente.telefono,
        enlace: ente.enlace,
      });

      // Depurar el resultado
      console.log('Resultado de createEnte:', result);

      // Verificar si el resultado es un ID válido
      if (result !== null && Number.isInteger(result)) {
        alert(`Ente creado correctamente con ID: ${result}`);
      } else {
        alert('No se recibió un ID válido. El ente podría no haber sido creado correctamente.');
      }

      // Limpiar el formulario después de enviar
      setEnte({
        idEnte: '',
        nombre: '',
        director: '',
        correo: '',
        telefono: '',
        enlace: '',
      });
    } catch (error) {
      console.error('Error al crear el ente:', error);
      alert('Hubo un error al crear el ente. Por favor, intenta de nuevo.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        name="idEnte"
        placeholder="ID del Ente"
        value={ente.idEnte}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={ente.nombre}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="director"
        placeholder="Director"
        value={ente.director}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="correo"
        placeholder="Correo"
        value={ente.correo}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="telefono"
        placeholder="Teléfono"
        value={ente.telefono}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="enlace"
        placeholder="Enlace"
        value={ente.enlace}
        onChange={handleChange}
        required
      />
      <button type="submit">Crear Ente</button>
    </form>
  );
};

export default CreateEnte;









