import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const BotaoSair = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Erro ao sair:", error);
      alert("Erro ao sair!");
    } else {
     
      navigate("/"); // ✅ Redireciona corretamente
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-roxo text-white px-4 py-2 rounded-md hover:bg-purple-500"
    >
      Sair
    </button>
  );
};

export default BotaoSair;
