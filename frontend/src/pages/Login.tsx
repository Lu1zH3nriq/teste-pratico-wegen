import { useEffect, useState } from "react";
import AuthForm from "../components/login/AuthForm";

const COLORS = {
  color1: "#e5fec5",
  color2: "#c5fec6",
  color3: "#a3fec7",
  color4: "#29ffc9",
  color5: "#392a35",
  color6: "#242424"
};

const Login = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#e5fec5] via-[#c5fec6] to-[#a3fec7] px-2 sm:px-4">
      <div
        className={`w-full max-w-md rounded-2xl shadow-xl p-4 sm:p-8 flex flex-col items-center transition-all duration-700 ease-out ${
          show ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{ background: COLORS.color5 }}
      >
        <h1
          className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center"
          style={{ color: COLORS.color4 }}
        >
          Bem-vindo!
        </h1>
        <p
          className="mb-6 sm:mb-8 text-center text-sm sm:text-base"
          style={{ color: COLORS.color2 }}
        >
          Faça login para acessar sua conta
        </p>
        <AuthForm palette={COLORS} />
      </div>
    </div>
  );
};

export default Login;
