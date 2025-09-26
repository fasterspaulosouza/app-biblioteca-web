"use client";

import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassowrd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      setError("mensagem....");
    }

    const data = await response.json();
    console.log("Login efetuado com sucesso:", data);

    // Quando o usario fizer o login correto, vamos salvar o token
    // no localstorage ou cookies
    localStorage.setItem("accessToken", data.accessToken);
    // router.push("/dashboard")

    window.location.href = "/";
  }

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
          Entre na sua Conta
        </h1>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="font-inter block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="font-inter mt-1 block w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            />
          </div>

          {/* Senha */}
          <div>
            <label
              htmlFor="password"
              className="font-inter block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {/* Botão */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5DAAAC] hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {/* Link esqueceu a senha */}
        <p className="text-center text-sm text-gray-700 mt-4">
          <a href="#" className="hover:underline font-medium">
            Esqueceu sua senha?
          </a>
        </p>
      </div>
    </div>
  );
}
