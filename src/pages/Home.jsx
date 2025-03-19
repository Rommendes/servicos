import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const Home = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [tipoServico, setTipoServico] = useState("");
  const [valor, setValor] = useState("");
  const [historicoServicos, setHistoricoServicos] = useState([]);

  // Função para buscar clientes do Supabase
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

  // Função para buscar histórico de serviços do cliente
  const fetchHistoricoServicos = async (clienteId) => {
    const { data, error } = await supabase
      .from("servicos_prestados")
      .select("*")
      .eq("cliente_id", clienteId)
      .order("data", { ascending: false });

    if (error) {
      console.error("Erro ao buscar histórico de serviços:", error);
    } else {
      setHistoricoServicos(data);
    }
  };

  // Função para selecionar um cliente
  const selecionarCliente = (cliente) => {
    setClienteSelecionado(cliente);
    fetchHistoricoServicos(cliente.id); // Carregar histórico ao selecionar
  };

  // Função para adicionar serviço ao histórico do cliente
  const adicionarServico = async () => {
    if (!clienteSelecionado || !tipoServico || !valor) {
      alert("Preencha todos os campos antes de adicionar o serviço.");
      return;
    }

    const { data, error } = await supabase
      .from("servicos_prestados")
      .insert([
        {
          cliente_id: clienteSelecionado.id,
          tipo_servico: tipoServico,
          valor: parseFloat(valor),
          data: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error("Erro ao adicionar serviço:", error);
    } else {
      setHistoricoServicos([...historicoServicos, ...data]); // Atualiza a lista
      setTipoServico("");
      setValor("");
    }
  };

  return (
    <div>
      <h2>Buscar Cliente</h2>
      <input
        type="text"
        placeholder="Buscar pelo nome ou telefone"
        onChange={(e) => {
          const termo = e.target.value.toLowerCase();
          const clienteEncontrado = clientes.find(
            (c) =>
              c.nome.toLowerCase().includes(termo) ||
              c.telefone.includes(termo)
          );
          if (clienteEncontrado) selecionarCliente(clienteEncontrado);
        }}
      />

      {clienteSelecionado && (
        <div>
          <h3>Cliente: {clienteSelecionado.nome}</h3>

          <h4>Adicionar Serviço</h4>
          <input
            type="text"
            placeholder="Tipo de serviço"
            value={tipoServico}
            onChange={(e) => setTipoServico(e.target.value)}
          />
          <input
            type="number"
            placeholder="Valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
          <button onClick={adicionarServico}>Adicionar Serviço</button>

          <h4>Histórico de Serviços</h4>
          <ul>
            {historicoServicos.map((servico) => (
              <li key={servico.id}>
                {servico.tipo_servico} - R${servico.valor} - {new Date(servico.data).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      )}
       <button
            onClick={() => navigate("/clientes")}
            className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Cadastro
          </button>
    </div>
  );
};

export default Home;
