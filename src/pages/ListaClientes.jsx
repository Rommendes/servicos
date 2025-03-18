import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import BotaoSair from "../Componentes/BotaoSair";

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();
  

// 🔹 Buscar clientes do Supabase ao carregar a página
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



   // Função para editar cliente
   const handleEditar = (cliente) => {
    navigate(`/editar-cliente/${cliente.id}`, { state: { cliente } });
  };

   // Função para excluir cliente
   const handleExcluir = async (id) => {
    const { error } = await supabase.from("clientes").delete().eq("id", id);

    if (error) {
      console.error("Erro ao excluir cliente:", error);
    } else {
      setClientes((clientes) => clientes.filter((cliente) => cliente.id !== id));
    }
  };

  return (
    <div className=" py-20">
    <div className="max-w-[90%] mx-auto  shadow-md rounded-lg p-10 bg-purple-100">
    <div className="flex justify-between items-center mb-4">

      
      <div>
        <h2 className="text-xl font-semibold text-roxo uppercase">Clientes</h2>
        <p className="text-sm text-gray-500">
          Lista de todos os clientes cadastrados no sistema.
        </p>
      </div>

      {/* Tabela de clientes */}
      <div className="  flex p-4 gap-4 mt-4">
      
      <button 
      onClick={() => navigate("/clientes")}
      className="bg-roxo text-white px-4 py-2 rounded-md hover:bg-purple-400 ">
        Adicionar Cliente
      </button>
      <BotaoSair/>
    </div>
    </div>

    {/* 🔹 Tabela de clientes */}
    <div className="overflow-x-auto pt-5">
      <table className="w-full border-collapse bg-white">
        <thead>

          <tr className="bg-roxinho text-left text-roxo  font-extraboldtext-sm uppercase">
            <th className="border p-2">Nº</th>
            <th className="border p-2">Nome</th>
            <th className="border p-2">Telefone</th>
            <th className="border p-2">Aniversário</th>
            <th className="border p-2">Endereço</th>
            <th className= "border p-2">Serviço</th>
            <th className="border p-2">Editar</th>
            <th className="border p-2">Excluir</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente, index) => (
            <tr
              key={cliente.id}
              className="border-b hover:bg-gray-50 transition">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{cliente.nome}</td>
              <td className="border p-2">{cliente.telefone}</td>
              <td className="border p-2">{cliente.dataAniversario}</td>
              <td className="border p-2">{cliente.endereco || "Sem endereço"}</td>
              <td className="border p-2">{cliente.servico || "Nenhum serviço selecionado"}</td>
              {/* Botões de ação posicionados fora da célula */}
          
              {/* Coluna para o botão de edição */}
              <td className="p-3 text-center border p-2"> 
            
                <button
                  onClick={() => handleEditar(cliente)}
                   title="Editar" >
                   ✏️
                </button>
              </td>

          {/* Coluna para o botão de exclusão */}
              <td className="p-3 text-center border p-2"> 
                <button
                  onClick={() => handleExcluir(cliente.id)}
                  title="Excluir">
                   ❌
                </button>
              </td>
        
          </tr>
          
          ))}
        </tbody>
      </table>

      {/* 🔹 Botão para voltar */}
      <button
        onClick={() => navigate("/home")}
        className="mt-4 bg-roxo text-white px-4 py-2 rounded-md hover:bg-purple-700"
      >
        Voltar para Home
      </button>
    
    </div>
  </div>
  </div>
  );
};

export default ListaClientes;

