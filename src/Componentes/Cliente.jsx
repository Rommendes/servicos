import React from "react";
import { useNavigate } from "react-router-dom";

const Cliente = ({ cliente }) => {
  const navigate = useNavigate();

  if (!cliente) {
    return <p className="text-center text-gray-500">Nenhum cliente encontrado.</p>;
  }

  return (
    <div className="border p-4 rounded-lg bg-white shadow-md">
      <h2 className="text-xl font-semibold text-gray-800">{cliente.nome}</h2>
      <p className="text-gray-600">📞 {cliente.telefone}</p>
      <p className="text-gray-600">🎂 {cliente.dataAniversario}</p>
      <p className="text-gray-600">📍 {cliente.endereco}</p>

      {/* Botão de Editar */}
      <button
        onClick={() => navigate(`/editar-cliente/${cliente.id}`)}
        className="mt-3 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
      >
        Editar Informações
      </button>
    </div>
  );
};

export default Cliente;
