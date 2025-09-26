"use client";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    hasUser();
  }, []);

  const hasUser = () => {
    const data = localStorage.getItem("accessToken");

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${data}`);

    fetch("http://localhost:3001/auth/me", {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        if (!result.statusCode) {
          alert("Usuario Encontrado!");
        } else {
          window.location.href = "/login";
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1 className="font-lexend-deca">Hello World!</h1>
    </div>
  );
}
