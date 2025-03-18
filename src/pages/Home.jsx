import bgImage from "../assets/salao.png"
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import BotaoSair from "../Componentes/BotaoSair";

const Home = () => {
  const [clientes, setClientes] = useState([]);
  const [search, setSearch] = useState("");
  const [resultados, setResultados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientes = async () => {
      const { data, error } = await supabase.from("clientes").select("*");
      if (error) {
        console.error("Erro ao buscar clientes: ", error);
      } else {
        setClientes(data);
      }
    };
    fetchClientes();
  }, []);

  const handlePesquisa = (e) => {
    e.preventDefault();
    const filtrados = clientes.filter((cliente) =>
      cliente.nome.toLowerCase().includes(search.toLowerCase())
    );
    setResultados(filtrados);
  };

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
      setResultados(resultados.filter((cliente) => cliente.id !== id));
    }
  };
  //

  return (
    <div className="w-full relative bg-no-repeat h-screen bg-cover overflow-hidden z-0 rounded-xl md:h-screen xl:h-screen lg:h-screen" 
        
        style={{backgroundImage: `url(${bgImage})`}}>
    
    <div className="container mx-auto p-4 max-w-[90%]">
        {/* Header de Navegação */}
        <header className="bg-roxo text-white py-4 px-6 flex justify-between items-center rounded-lg">
        <h1 className="text-xl font-bold">Painel de Clientes</h1>
        <nav className="flex gap-4">
          <button
            onClick={() => navigate("/")}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Voltar Login
          </button>
          <button
            onClick={() => navigate("/clientes")}
            className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Cadastro
          </button>
          
          <button
            onClick={() => navigate("/lista-clientes")}
            className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Clientes
          </button>

          <BotaoSair/>
        </nav>
      </header>

     {/* Título */}
      <h2 className="text-2xl font-bold text-center mt-6 text-roxo">
        Bem-vindo às informações do seu serviço!
      </h2>

      {/* Campo de pesquisa estilizado */}
      <form onSubmit={handlePesquisa} className="max-w-md mx-auto pt-5">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Pesquisar cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      {/* Tabela só aparece se houver pesquisa */}
      {resultados.length > 0 && (
        <div className="overflow-x-auto pt-5">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className=" bg-roxinho text-left text-roxo  font-extraboldtext-sm uppercase">
              <th className=" px-4 py-2">Nome</th>
              <th className=" px-4 py-2">Data de aniversário</th>
              <th className=" px-4 py-2">Telefone</th>
              <th className=" px-4 py-2">Endereço</th>
              <th className="p-3 text-center">Editar</th>
              <th className="p-3 text-center">Excluir</th>
            </tr >
          </thead>

          <tbody>
            {resultados.map((cliente) => (
              <tr key={cliente.id} className=" hover:bg-gray-50 transition">
                <td className="px-4 py-2 ">{cliente.nome}</td>
                <td className="px-4 py-2 ">{cliente.dataAniversario}</td>
                <td className="px-4 py-2 ">{cliente.telefone}</td>
                <td className="px-4 py-2 ">{cliente.endereco}</td>

                {/* Botões de ação posicionados fora da célula */}
                <td className="p-3 text-center"> {/* Coluna para o botão de edição */}
                  <button
                    onClick={() => handleEditar(cliente)}
                    className="text-yellow-500 hover:text-yellow-700 text-xl"
                    title="Editar"
          >
                    ✏️
                  </button>
                </td>
                 <td className="p-3 text-center"> {/* Coluna para o botão de exclusão */}
                    <button
                     onClick={() => handleExcluir(cliente.id)}
                     className="text-red-500 hover:text-red-700 text-xl"
                     title="Excluir"
                    >
                     ❌
                   </button>
                  </td>
              
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}

      {/* Mensagem caso nenhum cliente seja encontrado */}
      {search && resultados.length === 0 && (
        <p className="text-center mt-4">Nenhum cliente encontrado.</p>
      )}

       
    </div>
    </div>
  );
};

export default Home;
