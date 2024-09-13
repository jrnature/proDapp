import React, { useEffect, useState } from 'react';

function RetroalimentacionView() {
    const [retroalimentacion, setRetroalimentacion] = useState([]);

    useEffect(() => {
        obtenerRetroalimentacion().then((data) => setRetroalimentacion(data));
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center">Retroalimentación</h1>
            <ul className="list-group">
                {retroalimentacion.map((item) => (
                    <li key={item.id} className="list-group-item">
                        <strong>{item.aspecto}</strong>: {item.comentarios}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RetroalimentacionView;
