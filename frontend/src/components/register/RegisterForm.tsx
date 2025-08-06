import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

type Palette = {
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
};

interface RegisterFormProps {
  palette?: Palette;
  onRegister: (formData: { username: string; password: string }) => void;
}

const RegisterForm = ({ palette, onRegister }: RegisterFormProps) => {
  const COLORS = palette || {
    color1: "#677d74",
    color2: "#4d5f57",
    color3: "#34413a",
    color4: "#29ffc9",
    color5: "#392a35",
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (onRegister) {
      // Aguarda a função de registro terminar
      await Promise.resolve(onRegister({ username, password }));
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleRegister}
      className={`w-full max-w-sm p-3 sm:p-6 rounded-xl shadow-lg flex flex-col gap-3 sm:gap-4 transition-all duration-700 ease-out ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      style={{
        background: COLORS.color5,
        boxShadow: "0 4px 24px rgba(41, 255, 201, 0.2)",
      }}
    >
      <h2
        className="text-xl sm:text-2xl font-bold mb-2 text-center"
        style={{ color: COLORS.color4 }}
      >
        Registro
      </h2>

      <label
        className="block text-sm font-medium"
        style={{ color: COLORS.color2 }}
      >
        Usuário
      </label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 border rounded placeholder-opacity-100 focus:outline-none focus:ring-2 transition text-sm sm:text-base"
        style={{
          borderColor: COLORS.color3,
          background: COLORS.color1,
          color: COLORS.color5,
        }}
        placeholder="Escolha um nome de usuário"
        required
      />

      <label
        className="block text-sm font-medium"
        style={{ color: COLORS.color2 }}
      >
        Senha
      </label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded placeholder-opacity-80 focus:outline-none focus:ring-2 transition text-sm sm:text-base"
        style={{
          borderColor: COLORS.color3,
          background: COLORS.color1,
          color: COLORS.color5,
        }}
        placeholder="Crie uma senha segura"
        required
      />

      <button
        type="submit"
        className={`w-full py-2 px-4 rounded transition-colors font-semibold text-sm sm:text-base flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        style={{
          background: COLORS.color4,
          color: COLORS.color5,
        }}
        disabled={loading}
      >
        {loading ? (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg className="animate-spin mr-2" style={{ height: 22, width: 22 }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            Registrando...
          </span>
        ) : (
          "Registrar"
        )}
      </button>

      <div
        className="mt-2 text-center text-sm"
        style={{ color: COLORS.color2 }}
      >
        Já tem uma conta?{" "}
        <Link
          to="/login"
          className="hover:underline"
          style={{ color: COLORS.color4 }}
        >
          Faça login aqui
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;