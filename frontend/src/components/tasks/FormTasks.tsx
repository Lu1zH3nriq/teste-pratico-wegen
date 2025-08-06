import React, { useState } from "react";
import ConfirmationSucessModal from "../utils/confirmationSucessModal";
import ConfirmationErrorModal from "../utils/confirmationErrorModal";
import { Taks, Colors } from "../../types/taskList";

interface FormTasksProps {
  colors: Colors;
  onTaskCreated?: () => void;
}

const FormTasks: React.FC<FormTasksProps> = ({ colors, onTaskCreated }) => {
  const [form, setForm] = useState<Taks>({
    id: 0,
    title: "",
    completed: false,
    description: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      title: form.title,
      description: form.description,
      category: form.category,
      isCompleted: false,
    };
    import("../../services/taskService").then(({ createTask }) => {
      createTask(payload)
        .then(() => {
          setForm({ id: 0, title: "", completed: false, description: "", category: "" });
          setShowSuccessModal(true);
          if (onTaskCreated) onTaskCreated();
        })
        .catch(() => {
          setShowErrorModal(true);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  return (
    <div
      className="flex items-center justify-center px-2 py-5 min-h-[40vh]"
      style={{
        background: `linear-gradient(135deg, ${colors.color1}, ${colors.color2}, ${colors.color3})`,
      }}
    >
      <form
        className="rounded-2xl shadow-2xl p-6 sm:p-10 flex flex-col w-full max-w-7xl mx-auto border"
        style={{
          background: colors.color6,
          border: `2px solid ${colors.color4}`,
        }}
        onSubmit={handleSubmit}
      >
        <h2
          className="text-2xl sm:text-3xl font-bold mb-6 text-center tracking-tight"
          style={{ color: colors.color1, letterSpacing: "-1px" }}
        >
          Nova Tarefa
        </h2>
        <div className="mb-4 flex flex-col sm:flex-row w-full gap-4">
          <div className="flex-1">
            <label
              htmlFor="title"
              className="block font-semibold mb-2 text-base"
              style={{ color: colors.color2 }}
            >
              Título
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-base transition"
              style={{
                background: colors.color1,
                color: colors.color6,
                border: `1.5px solid ${colors.color3}`,
                boxShadow: `0 2px 8px ${colors.color2}33`,
              }}
              required
            />
          </div>
          <div className="flex-1 flex flex-col items-start">
            <label
              htmlFor="category"
              className="block font-semibold mb-2 text-base"
              style={{ color: colors.color2 }}
            >
              Categoria
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-base transition"
              style={{
                background: colors.color1,
                color: colors.color6,
                border: `1.5px solid ${colors.color3}`,
                boxShadow: `0 2px 8px ${colors.color2}33`,
              }}
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block font-semibold mb-2 text-base"
            style={{ color: colors.color2 }}
          >
            Descrição
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-base transition resize-vertical"
            rows={3}
            style={{
              background: colors.color1,
              color: colors.color6,
              border: `1.5px solid ${colors.color3}`,
              boxShadow: `0 2px 8px ${colors.color2}33`,
            }}
            required
          />
        </div>
        <div className="flex items-center justify-center mt-2">
          <button
            type="submit"
            className="w-full sm:w-1/3 py-2 px-4 rounded-lg font-bold transition text-base bg-gradient-to-r from-gray-400 to-gray-700 hover:scale-105 hover:shadow-xl flex items-center justify-center"
            style={{
              color: colors.color1,
              letterSpacing: "0.5px",
              position: "relative",
            }}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                Cadastrando...
              </span>
            ) : (
              "Cadastrar"
            )}
          </button>
        </div>
      </form>
      <ConfirmationSucessModal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message="Tarefa cadastrada com sucesso!"
      />
      <ConfirmationErrorModal
        open={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        message="Erro ao cadastrar tarefa. Tente novamente."
      />
    </div>
  );
};

export default FormTasks;
