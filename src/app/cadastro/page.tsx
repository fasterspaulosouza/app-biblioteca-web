import { Metadata } from "next";
import Cadastro from "./CadastroClient";

export const metadata: Metadata = {
  title: "Cadastro - Biblioteca Web",
};

export default function CadastroPage() {
  return <Cadastro />;
}
