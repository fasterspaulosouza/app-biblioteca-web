import { Metadata } from "next";
import Login from "./LoginClient";

export const metadata: Metadata = {
  title: "Login - Biblioteca Web",
};

export default function LoginPage() {
  return <Login />;
}
