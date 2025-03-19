import { useState } from "react";
import {  useEffect } from "react";

const EnderecoForm = ({ endereco = {}, onChange }) => {
  const enderecoInicial = {
    rua: "", 
    numero: "", 
    complemento: "", 
    bairro: "", 
    cidade: "", 
    cep: ""
  };

  // 🔹 Usa o estado inicial apenas se `endereco` estiver vazio
  const [localEndereco, setLocalEndereco] = useState({ ...enderecoInicial, ...endereco });

  useEffect(() => {
    onChange(localEndereco); // 🔹 Garante que o endereço inicial seja enviado ao componente pai
  }, []); // Apenas na montagem do componente

  const handleChange = (e) => {
    const { name, value } = e.target;
    const novoEndereco = { ...localEndereco, [name]: value };
    setLocalEndereco(novoEndereco);
    onChange(novoEndereco);
  };


  return (
    <div className="my-7 p-4 border rounded shadow">
    <h3 className="text-md font-bold mb-2">Endereço</h3>
  
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block">Rua:</label>
        <input
          type="text"
          name="rua"
          value={localEndereco.rua}
          onChange={handleChange}
          placeholder="Nome da Rua"
          className="border p-2 w-full rounded"
        />
      </div>
  
      <div>
        <label className="block">Número:</label>
        <input
          type="text"
          name="numero"
          value={localEndereco.numero}
          onChange={handleChange}
          placeholder="Número"
          className="border p-2 w-full rounded"
        />
      </div>
  
      <div>
        <label className="block">Complemento:</label>
        <input
          type="text"
          name="complemento"
          value={localEndereco.complemento}
          onChange={handleChange}
          placeholder="Apartamento, Bloco, etc."
          className="border p-2 w-full rounded"
        />
      </div>
  
      <div>
        <label className="block">Bairro:</label>
        <input
          type="text"
          name="bairro"
          value={localEndereco.bairro}
          onChange={handleChange}
          placeholder="Bairro"
          className="border p-2 w-full rounded"
        />
      </div>
  
      <div>
        <label className="block">Cidade:</label>
        <input
          type="text"
          name="cidade"
          value={localEndereco.cidade}
          onChange={handleChange}
          placeholder="Nome da Cidade"
          className="border p-2 w-full rounded"
        />
      </div>
  
      <div>
        <label className="block">CEP:</label>
        <input
          type="text"
          name="cep"
          value={localEndereco.cep}
          onChange={handleChange}
          placeholder="00000-000"
          maxLength={9}
          className="border p-2 w-full rounded"
        />
      </div>
    </div>
  </div>
  
  );
};

export default EnderecoForm;
