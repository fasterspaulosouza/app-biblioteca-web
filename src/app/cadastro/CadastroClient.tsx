"use client";

import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function Cadastro() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassowrd] = useState(false);
  const [formData, setFormData] = useState({
    nomeAluno: "",
    sexo: "",
    dataNascimento: "",
    nomeResponsavel: "",
    email: "",
    senha: "",
    cep: "",
    bairro: "",
    numero: "",
    cidade: "",
    uf: "",
    endereco: "",
    complemento: "",
  });

  // Funçao para atualizar o formulário
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função para atualizar o step
  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  const handleSubmit = async () => {
    try {
      const resp = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.nomeAluno,
          email: formData.email,
          password: formData.senha,
        }),
      });
      console.log(resp);

      const data = await resp.json();
      console.log(data);

      if (resp.ok) {
        alert("Usuário cadastrado com sucesso!");

        localStorage.setItem("accessToken", data.accessToken);

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${data.accessToken}`);

        fetch("http://localhost:3001/auth/me", {
          method: "POST",
          headers: myHeaders,
          redirect: "follow",
        })
          .then((response) => response.json())
          .then((result) => console.log(result))
          .catch((error) => console.error(error));
      } else {
        alert("Erro ao cadastrar o usuário!");
      }
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao se cadastrar");
    }
  };

  // Busca do CEP via API
  const handleCepBlur = async () => {
    const cep = formData.cep.replace(/\D/g, ""); // remove caracteres não númericos

    try {
      const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await resp.json();

      if (!data.erro) {
        setFormData((prev) => ({
          ...prev,
          bairro: data.bairro || "",
          cidade: data.localidade || "",
          uf: data.uf || "",
          endereco: data.logradouro || "",
        }));
      } else {
        alert("CEP não encontrado!");
      }
    } catch (error) {
      console.log("Erro ao buscar CEP:", error);
      alert("Erro ao buscar CEP.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EAF2F3]">
      <div className="w-full max-w-md bg-white rounded-2xl p-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/login/logo-biblioteca.png"
            alt="Logo"
            width={72}
            height={72}
          />
        </div>

        {/* Titulo */}
        <h1 className="font-lexend-deca font-bold text-center mb-6 text-2xl">
          Novo cadastro
        </h1>

        {/* STEPS */}
        <div className="text-center mb-6">
          <div className="flex justify-center mt-4 space-x-6">
            <div
              className={`flex item-center space-x-2 ${
                step >= 1 ? "text-green-500" : "text-gray-400"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                  step >= 1 ? "bg-green-500 text-white" : ""
                }`}
              >
                1
              </div>
              <span>Perfil</span>
            </div>
            <div
              className={`flex item-center space-x-2 ${
                step === 2 ? "text-green-500" : "text-gray-400"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                  step === 2 ? "bg-green-500 text-white" : ""
                }`}
              >
                2
              </div>
              <span>Endereço</span>
            </div>
          </div>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="nomeAluno"
                className="font-inter block text-sm font-medium text-gray-700"
              >
                Nome do aluno
              </label>
              <input
                type="text"
                name="nomeAluno"
                placeholder="Digite o nome do aluno"
                value={formData.nomeAluno}
                onChange={handleChange}
                className="font-inter mt-1 block w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                required
              />
            </div>
            <div className="flex space-x-2">
              <div className="flex flex-col justify-center  ">
                <label
                  htmlFor="dataNascimento"
                  className="font-inter block text-sm font-medium text-gray-700"
                >
                  Data de nascimento
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-1">
                    <input
                      type="radio"
                      name="sexo"
                      value="Masculino"
                      onChange={handleChange}
                    />
                    <span>Masculino</span>
                  </label>
                  <label className="flex items-center space-x-1">
                    <input
                      type="radio"
                      name="sexo"
                      value="Feminino"
                      onChange={handleChange}
                    />
                    <span>Feminino</span>
                  </label>
                </div>
              </div>
              <div>
                <label
                  htmlFor="dataNascimento"
                  className="font-inter block text-sm font-medium text-gray-700"
                >
                  Data de nascimento
                </label>
                <input
                  type="date"
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleChange}
                  className="font-inter mt-1 block w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="nomeResponsavel"
                className="font-inter block text-sm font-medium text-gray-700"
              >
                Nome do responsável
              </label>
              <input
                type="text"
                name="nomeResponsavel"
                value={formData.nomeResponsavel}
                placeholder="Digite o nome do responsável"
                onChange={handleChange}
                className="font-inter mt-1 block w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="font-inter block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="emai"
                name="email"
                value={formData.email}
                placeholder="Digite o seu e-mail"
                onChange={handleChange}
                className="font-inter mt-1 block w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="senha"
                className="font-inter block text-sm font-medium text-gray-700"
              >
                Senha
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  name="senha"
                  placeholder="Digite sua senha"
                  value={formData.senha}
                  onChange={handleChange}
                  className="font-inter black w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassowrd(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div>
              <button
                onClick={handleNext}
                className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600"
              >
                Avançar
              </button>
            </div>
          </div>
        )}

        {/* Step */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="cep"
                className="font-inter block text-sm font-medium text-gray-700"
              >
                CEP
              </label>
              <input
                type="text"
                name="cep"
                placeholder="Digite seu CEP"
                value={formData.cep}
                onChange={handleChange}
                onBlur={handleCepBlur}
                className="font-inter mt-1 block w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                required
              />
            </div>
            <div className="flex space-x-2">
              <div>
                <label
                  htmlFor="bairro"
                  className="font-inter block text-sm font-medium text-gray-700"
                >
                  Bairro
                </label>
                <input
                  type="text"
                  name="bairro"
                  placeholder="Digite seu Bairro"
                  value={formData.bairro}
                  onChange={handleChange}
                  className="font-inter mt-1 block w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="numero"
                  className="font-inter block text-sm font-medium text-gray-700"
                >
                  Número
                </label>
                <input
                  type="text"
                  name="numero"
                  placeholder="Número"
                  value={formData.numero}
                  onChange={handleChange}
                  className="font-inter mt-1 block w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <div>
                <label
                  htmlFor="cidade"
                  className="font-inter block text-sm font-medium text-gray-700"
                >
                  Cidade
                </label>
                <input
                  type="text"
                  name="cidade"
                  placeholder="Cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  className="font-inter mt-1 block w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="uf"
                  className="font-inter block text-sm font-medium text-gray-700"
                >
                  UF
                </label>
                <input
                  type="text"
                  name="uf"
                  placeholder="UF"
                  value={formData.uf}
                  onChange={handleChange}
                  className="font-inter mt-1 block w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="endereco"
                className="font-inter block text-sm font-medium text-gray-700"
              >
                Endereço
              </label>
              <input
                type="text"
                name="endereco"
                placeholder="Digite seu endereço"
                value={formData.endereco}
                onChange={handleChange}
                className="font-inter mt-1 block w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="complemento"
                className="font-inter block text-sm font-medium text-gray-700"
              >
                Complemento
              </label>
              <input
                type="text"
                name="complemento"
                placeholder="Ex: Ao lado da Faculdade FAEX"
                value={formData.complemento}
                onChange={handleChange}
                className="font-inter mt-1 block w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleBack}
                className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600"
              >
                Voltar
              </button>
              <button
                onClick={handleSubmit}
                className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600"
              >
                Finalizar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
