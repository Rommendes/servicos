import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import BotaoSair from "../Componentes/BotaoSair";

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientes = async () => {
      const { data, error } = await supabase.from("clientes").select("*");
      if (error) {
        console.error("Erro ao buscar clientes: ", error);
      } else {
        console.log("Clientes JSON:", JSON.stringify(data, null, 2));
        setClientes(data);
      }
    };
    fetchClientes();
  }, []);
  console.log(ListaClientes)

  return (
    
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
    <div className="flex justify-between items-center mb-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Clientes</h2>
        <p className="text-sm text-gray-500">
          Lista de todos os clientes cadastrados no sistema.
        </p>
      </div>
      <div className="  flex p-4 gap-4 mt-4">
      <button 
      onClick={() => navigate("/clientes")}
      className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 ">
        Adicionar Cliente
      </button>
      <BotaoSair/>
    </div>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white">
        <thead>
          <tr className="border-b bg-gray-100 text-left text-gray-600 text-sm">
            <th className="p-3">#</th>
            <th className="p-3">Nome</th>
            <th className="p-3">Telefone</th>
            <th className="p-3">Aniversário</th>
            <th className="p-3">Endereço</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente, index) => (
            <tr
              key={cliente.id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="p-3">{index + 1}</td>
              <td className="p-3">{cliente.nome}</td>
              <td className="p-3">{cliente.telefone}</td>
              <td className="p-3">{cliente.dataAniversario}</td>
              <td className="p-3">{cliente.endereco}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default ListaClientes;

