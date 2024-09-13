// import React, { useEffect, useState } from 'react';

// function ReplicaView() {
//     const [resultados, setResultados] = useState([]);
//     const [replicas, setReplicas] = useState({});

//     useEffect(() => {
//         obtenerResultadosEvaluador().then((data) => setResultados(data));
//     }, []);

//     const handleReplicaChange = (resultadoId, replica) => {
//         setReplicas({ ...replicas, [resultadoId]: replica });
//     };

//     const handleSubmitReplica = (e) => {
//         e.preventDefault();
//         enviarReplicas(replicas).then(() => {
//             alert('Réplica enviada correctamente');
//         });
//     };

//     return (
//         <div className="container mt-5">
//             <h1 className="text-center">Réplica</h1>
//             <form onSubmit={handleSubmitReplica}>
//                 {resultados.map((resultado) => (
//                     <div key={resultado.id} className="mb-4">
//                         <p><strong>{resultado.pregunta}</strong>: {resultado.valor}</p>
//                         <textarea
//                             className="form-control"
//                             placeholder="Escribe tu réplica"
//                             onChange={(e) => handleReplicaChange(resultado.id, e.target.value)}
//                         ></textarea>
//                     </div>
//                 ))}
//                 <button type="submit" className="btn btn-primary mt-3">Enviar Réplicas</button>
//             </form>
//         </div>
//     );
// }

// export default ReplicaView;
