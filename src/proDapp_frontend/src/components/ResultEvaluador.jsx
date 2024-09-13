// import React, { useEffect, useState } from 'react';

// function ResultadosEvaluadorView() {
//     const [resultados, setResultados] = useState([]);

//     useEffect(() => {
//         obtenerResultadosEvaluador().then((data) => setResultados(data));
//     }, []);

//     return (
//         <div className="container mt-5">
//             <h1 className="text-center">Resultados del Evaluador</h1>
//             <ul className="list-group">
//                 {resultados.map((resultado) => (
//                     <li key={resultado.id} className="list-group-item">
//                         <strong>{resultado.pregunta}</strong>: {resultado.valor}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default ResultadosEvaluadorView;
