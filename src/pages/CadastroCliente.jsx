import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import EnderecoForm from "../Componentes/EnderecoForm";
import bgImage from "../assets/salao.png";
import BotaoSair from "../Componentes/BotaoSair";
import servicos from "../data/servicos.json"; // Importando a lista de serviços

const CadastroCliente = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);

  const [cliente, setCliente] = useState({
    nome: "",
    telefone: "",
    dataAniversario: "",
    endereco: { rua: "", numero: "", complemento: "", bairro: "", cidade: "", cep: ""},
    servico: "" // Adicionando o serviço selecionado
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prevCliente) => ({
      ...prevCliente,
      [name]: value,
    }));
  };

  const handleEnderecoChange = (novoEndereco) => {
    setCliente((prevCliente) => ({
      ...prevCliente,
      endereco: novoEndereco,
    }));
  };

  // 🔹 Buscar clientes do Supabase ao carregar a página
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

  // 🔹 Função para cadastrar o cliente no Supabase
  const handleCadastro = async (e) => {
    e.preventDefault();

    // Validação para evitar cadastros vazios.
    if (!cliente.nome || !cliente.telefone || !cliente.endereco.rua || !cliente.endereco.cidade) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    
    const clienteParaInserir = {
      nome: cliente.nome,
      ["dataAniversário"]: cliente.dataAniversario, // Força a chave exata do banco
      telefone: cliente.telefone,
      endereco: cliente.endereco,
      servico: cliente.servico,
    };

    const { data, error } = await supabase
    .from("clientes")
    .insert([clienteParaInserir])
    .select("*");

    if (error) {
      console.error("Erro ao cadastrar cliente: ", error);
      return;
    }

    if (data) {
      setClientes([...clientes, ...data]); // 🔹 Atualiza lista apenas se data for um array
    }

    // 🔹 Limpa os campos do formulário
    setCliente({
      nome: "",
      dataAniversario: "",
      telefone: "",
      endereco: {},
      servico: ""
    });
  };


  const formatarTelefone = (value) => {
    value = value.replace(/\D/g, "");
    if (value.length > 10) {
      return value.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (value.length > 6) {
      return value.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else if (value.length > 2) {
      return value.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    } else {
      return value;
    }
  };

  const handleTelefoneChange = (e) => {
    const telefoneFormatado = formatarTelefone(e.target.value);
    setCliente({ ...cliente, telefone: telefoneFormatado });
  };

  return (
    <div className="w-full relative bg-no-repeat bg-cover overflow-hidden z-0 rounded-xl" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl border border-gray-500">
          <h2 className="text-2xl text-center font-bold mb-4 text-cinza">Cadastro de Cliente</h2>
          <form onSubmit={handleCadastro} className="space-y-2">
            <label className="block mt-2">Nome:</label>
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              value={cliente.nome}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />

            <label className="block mt-2">Data de aniversário:</label>
            <input
              type="date"
              name="dataAniversario"
              value={cliente.dataAniversario}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />

            <label className="block mt-2">Telefone:</label>
            <input
              type="tel"
              value={cliente.telefone}
              onChange={handleTelefoneChange}
              placeholder="(XX) XXXXX-XXXX"
              maxLength={15}
              className="w-full p-2 border rounded"
              required
            />

            {/* Dropdown para selecionar o serviço */}
            <label className="block mt-2">Serviço:</label>
            <select
              name="servico"
              value={cliente.servico}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Selecione um serviço</option>
              {servicos.map((servico) => (
                <option key={servico.id} value={servico.nome}>
                  {servico.nome} - R$ {servico.preco.toFixed(2)}
                </option>
              ))}
            </select>

            <EnderecoForm onChange={handleEnderecoChange} />
          </form>

          <div className="flex gap-4 mt-4 justify-center">
            <button onChange={handleCadastro}
            type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
              Adicionar Cliente
            </button>

            {/* Botão para visualizar a lista de clientes */}
            <button onClick={() => navigate("/lista-clientes")} className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
              Ver Lista de Clientes
            </button>

            <button onClick={() => navigate("/home")} className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
              Home
            </button>

            <BotaoSair />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroCliente;
