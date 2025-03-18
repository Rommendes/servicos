import { useState } from "react";

const EnderecoForm = ({ onChange }) => {
  const [endereco, setEndereco] = useState({
    rua: "",
    numero: "",
    complemento: "",
    cidade: "",
    cep: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEndereco((prev) => ({ ...prev, [name]: value }));
    onChange({ ...endereco, [name]: value });
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
          value={endereco.rua}
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
          value={endereco.numero}
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
          value={endereco.complemento}
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
          value={endereco.bairro}
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
          value={endereco.cidade}
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
          value={endereco.cep}
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
