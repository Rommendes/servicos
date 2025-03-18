import bgImage from "../assets/salao.png"
import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({      
        email,
        password });

    if (error) {
      setError("Erro ao entrar. Verifique os dados.");
    } else {
      navigate("/home")
    }
  };
  
  return (
    <div 
    className="w-full relative bg-no-repeat bg-cover overflow-hidden z-0 rounded-xl"
    style={{backgroundImage: `url(${bgImage})`}}>
  
  <div className="flex items-center justify-center min-h-screen  bg-cover bg-center "
  // style={{ backgroundImage: `url(${bgImage.src})` }}
  >
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl border border-gray-500  ">
      
        <h2 className="text-3xl font-bold mb-6 text-center text-cinza uppercase" translate="no">Login</h2>

        {error && <p>{error}</p>}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-cinza">Email</label>
            <input
              type="email"
              placeholder="digite seu email"
              className="w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cinza"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-cinza">Senha</label>
            <input
              type="password"
              placeholder="digite sua senha"
              className="w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cinza"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-roxo text-white py-3 rounded-lg hover:bg-cinza hover:text-roxo hover:font-bold transition text-lg"
          >
            Entrar
          </button>
        </form>
      </div>
      </div>
      </div>
  );
};

export default Login;
