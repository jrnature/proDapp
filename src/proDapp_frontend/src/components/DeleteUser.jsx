import React, { useState } from "react";


const DeleteUser = () => {
  const [idUsuario, setIdUsuario] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actor.deleteUsuario(Number(idUsuario));
      alert("Usuario eliminado con éxito");
    } catch (error) {
      alert("Error al eliminar usuario: " + error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Eliminar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID del Usuario</label>
          <input
            className="form-control"
            type="number"
            placeholder="ID del Usuario"
            value={idUsuario}
            onChange={(e) => setIdUsuario(e.target.value)}
          />
        </div>
        <button className="btn btn-danger mt-3" type="submit">Eliminar Usuario</button>
      </form>
    </div>
  );
};

export default DeleteUser;

