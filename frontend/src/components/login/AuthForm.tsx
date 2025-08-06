import { useState, useEffect } from "react";
import { login } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Colors } from "../../types/taskList";

interface AuthFormProps {
  palette?: Colors;
}

const AuthForm = ({ palette }: AuthFormProps) => {
  const COLORS: Colors = palette || {
    color1: "#677d74",
    color2: "#4d5f57",
    color3: "#34413a",
    color4: "#29ffc9",
    color5: "#392a35",
    color6: "#ffffff",
  };

  const [username, setUsername] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login: setAuth } = useAuth();

  useEffect(() => {
    setShow(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await login({ username, passwordHash });
      
      if (response?.status === 200 && response.data?.token) {
        const token = response.data.token;
        
        setAuth(username, token);
        navigate("/tasks");
      } else {
        setMessage(
          response?.message || "Login falhou. Verifique suas credenciais."
        );
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setMessage("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className={`w-full max-w-sm p-3 sm:p-6 rounded-xl shadow-lg flex flex-col gap-3 sm:gap-4 transition-all duration-700 ease-out ${
        show ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
      style={{
        background: COLORS.color5,
        boxShadow: "0 4px 24px rgba(41, 255, 201, 0.2)",
      }}
    >
      <h2
        className="text-2xl font-bold mb-2 text-center"
        style={{ color: COLORS.color4 }}
      >
        Login
      </h2>

      <label
        className="block text-sm font-medium"
        style={{ color: COLORS.color2 }}
        htmlFor="username"
      >
        Usuário
      </label>
      <input
        id="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 border rounded placeholder-opacity-100 focus:outline-none focus:ring-2 transition"
        style={{
          borderColor: COLORS.color3,
          background: COLORS.color1,
          color: COLORS.color5,
        }}
        placeholder="Digite seu nome de usuário"
        required
      />

      <label
        className="block text-sm font-medium"
        style={{ color: COLORS.color2 }}
        htmlFor="password"
      >
        Senha
      </label>
      <input
        id="password"
        type="password"
        value={passwordHash}
        onChange={(e) => setPasswordHash(e.target.value)}
        className="w-full p-2 border rounded placeholder-opacity-80 focus:outline-none focus:ring-2 transition"
        style={{
          borderColor: COLORS.color3,
          background: COLORS.color1,
          color: COLORS.color5,
        }}
        placeholder="Digite sua senha"
        required
      />

      <button
        type="submit"
        className="w-full py-2 px-4 rounded transition-colors font-semibold flex items-center justify-center gap-2"
        style={{
          background: COLORS.color4,
          color: COLORS.color5,
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
        }}
        disabled={loading}
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        ) : (
          "Entrar"
        )}
      </button>

      {message && (
        <p className="text-sm text-red-400 text-center mt-2">{message}</p>
      )}

      <div
        className="mt-2 text-center text-sm"
        style={{ color: COLORS.color2 }}
      >
        Não tem uma conta?{" "}
        <Link
          to="/register"
          className="hover:underline"
          style={{ color: COLORS.color4 }}
        >
          Registre-se aqui
        </Link>
      </div>
    </form>
  );
};

export default AuthForm;
