"use client";

import { useState } from "react";
import { Button } from "@mui/material";
import { Input } from "../ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { login } from "@/services/api/userApi";
import Loading from "../components/Loading";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = { email, password };
      const response = await login(data);
      const { token } = response;
      localStorage.setItem("usertoken", token);
      toast.success("Bem vindo!");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error("Erro ao fazer login, verifique as credenciais.");
      console.log(err, "err");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <form className="space-y-6" onSubmit={handleLogin}>
        <Input
          label="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Lembrar de mim
            </label>
          </div>

          <div className="text-sm">
            <Link
              href="/recuperar-senha"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Esqueceu sua senha?
            </Link>
          </div>
        </div>

        <div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="w-full justify-center"
            disabled={loading} // desabilita botão enquanto carrega
          >
            Entrar
          </Button>
        </div>

        <div className="text-center text-sm text-gray-600">
          Não tem uma conta?{" "}
          <Link
            href="/signup"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Cadastre-se
          </Link>
        </div>
      </form>
    </>
  );
}
