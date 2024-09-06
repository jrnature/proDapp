import React, { useState } from 'react';

const CreateEnte = ({ createEnte }) => {
    const [ente, setEnte] = useState({
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
            const idEnte = Math.floor(Math.random() * 1000); // Generar un ID temporal
            await createEnte(idEnte, ente);
            alert('Ente creado correctamente');
            // Opcional: Limpiar el formulario después de enviar
            setEnte({
                nombre: '',
                director: '',
                correo: '',
                telefono: '',
                enlace: '',
            });
        } catch (error) {
            console.error('Error al crear el ente:', error);
            // Opcional: Mostrar un mensaje de error en la interfaz
            alert('Hubo un error al crear el ente. Por favor, intenta de nuevo.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
