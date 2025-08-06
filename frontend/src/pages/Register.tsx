import RegisterForm from "../components/register/RegisterForm";
import { useEffect, useState } from "react";
import ConfirmationSuccessModal from "../components/utils/confirmationSucessModal";
import ConfirmationErrorModal from "../components/utils/confirmationErrorModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Nova paleta de cores
const COLORS = {
  color1: "#e5fec5",
  color2: "#c5fec6",
  color3: "#a3fec7",
  color4: "#29ffc9",
  color5: "#392a35",
};

const Register = () => {
  const [show, setShow] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  // Função para cadastro
  const handleRegister = async (formData: { username: string; password: string }) => {
    try {
      const payload = {
        username: formData.username,
        passwordHash: formData.password,
      };
      const response = await axios.post("http://localhost:5289/api/Auth/register", payload, {
        headers: { "Content-Type": "application/json" },
      });
      const result = response.data;
      if (response.status === 201 && result.status === 201) {
        setModalMessage(result.message || "Usuário registrado com sucesso.");
        setSuccessModalOpen(true);
      } else {
        setModalMessage(result.message || "Erro ao registrar usuário.");
        setErrorModalOpen(true);
      }
    } catch (error: any) {
      setModalMessage(
        error?.response?.data?.message || "Erro ao registrar usuário."
      );
      setErrorModalOpen(true);
    }
  };

  // Após sucesso, redireciona para login
  const handleSuccessClose = () => {
    setSuccessModalOpen(false);
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#e5fec5] via-[#c5fec6] to-[#a3fec7] px-2 sm:px-4">
      <div
        className={`w-full max-w-md rounded-2xl shadow-xl p-4 sm:p-8 flex flex-col items-center transition-all duration-700 ease-out ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        style={{ background: COLORS.color5 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center" style={{ color: COLORS.color4 }}>
          Crie sua conta
        </h1>
        <p className="mb-6 sm:mb-8 text-center text-sm sm:text-base" style={{ color: COLORS.color2 }}>
          Preencha os dados para se registrar
        </p>
        <RegisterForm palette={COLORS} onRegister={handleRegister} />
      </div>
      <ConfirmationSuccessModal
        open={successModalOpen}
        message={modalMessage}
        onClose={handleSuccessClose}
      />
      <ConfirmationErrorModal
        open={errorModalOpen}
        message={modalMessage}
        onClose={() => setErrorModalOpen(false)}
      />
    </div>
  );
};

export default Register;
