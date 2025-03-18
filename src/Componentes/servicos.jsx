import React from "react";

const Servicos = ({ listaServicos }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Histórico de Serviços</h2>
          <p className="text-sm text-gray-500">
            Veja os serviços realizados para cada cliente.
          </p>
        </div>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
          Adicionar Serviço
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="border-b bg-gray-100 text-left text-gray-600 text-sm">
              <th className="p-3">#</th>
              <th className="p-3">Serviço</th>
              <th className="p-3">Valor</th>
              <th className="p-3">Data</th>
              <th className="p-3">Observações</th>
            </tr>
          </thead>
          <tbody>
            {listaServicos.length > 0 ? (
              listaServicos.map((servico, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{servico.tipo}</td>
                  <td className="p-3">R$ {servico.valor}</td>
                  <td className="p-3">{servico.data}</td>
                  <td className="p-3">{servico.observacoes || "Nenhuma"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-roxo ">
                  Nenhum serviço cadastrado ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Servicos;
