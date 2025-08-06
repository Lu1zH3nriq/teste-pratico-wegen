import TaskList from "../components/tasks/TaskList";
import FormTasks from "../components/tasks/FormTasks";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { getAllTasks } from "../services/taskService";
import { getTasksByCategory } from "../services/taskService";
import { Taks } from "../types/taskList";

const COLORS = {
  color1: "#e5fec5",
  color2: "#c5fec6",
  color3: "#a3fec7",
  color4: "#29ffc9",
  color5: "#392a35",
  color6: "#242424",
};

const Tasks = () => {
  const [tasks, setTasks] = useState<Taks[]>([]);
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const fetchTasks = async () => {
    try {
      const response = await getAllTasks();

    const mappedTasks = response.data.map((task: any) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      category: task.category,
      completed: task.isCompleted,
    }));

      setTasks(mappedTasks);
      setMessage(response.message);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      setMessage("Erro ao carregar tarefas.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCategorySearch = async () => {
    if (!category.trim()) return;
    setLoading(true);
    try {
      const response = await getTasksByCategory(category.trim());
      setTasks(response.data);
      setMessage(response.message);
    } catch (error) {
      setMessage("Erro ao buscar tarefas por categoria.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen relative"
      style={{
        background: `linear-gradient(135deg, ${COLORS.color1}, ${COLORS.color2}, ${COLORS.color3})`,
      }}
    >
      <div className="w-full flex items-center justify-end absolute top-0 right-0">
        <IconButton
          aria-label="logout"
          onClick={handleLogout}
          sx={{ color: COLORS.color6 }}
          title="Sair"
        >
          <LogoutIcon />
        </IconButton>
      </div>
      <div className="w-full max-w-8xl mx-auto p-4">
        <FormTasks colors={COLORS} onTaskCreated={fetchTasks} />

        <h1
          className="text-xl sm:text-2xl md:text-3xl font-medium mb-4 sm:mb-6 text-center"
          style={{ color: COLORS.color6 }}
        >
          Minhas Tarefas
        </h1>

        {/* Filtro por categoria */}
        <div className="flex flex-row items-center justify-center gap-4 w-full mb-6 animate-fade-in">
          <div className="flex items-center bg-white/80 rounded-xl shadow-lg px-4 py-3 w-full max-w-xl border border-blue-200 backdrop-blur-md">
            <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 16l4-4-4-4m8 8V8" /></svg>
            <input
              type="text"
              placeholder="Filtrar por categoria..."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-lg px-2 text-blue-900 placeholder-blue-400 font-medium"
              style={{ minWidth: 180 }}
              autoFocus
            />
            <button
              onClick={handleCategorySearch}
              disabled={loading || !category.trim()}
              className={`transition-all duration-200 bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white font-bold px-5 py-2 rounded-xl shadow-lg ml-2 flex items-center gap-2 ${loading || !category.trim() ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" /></svg>
              {loading ? "Buscando..." : "Buscar"}
            </button>
            {category.trim() && (
              <button
                onClick={async () => {
                  setLoading(true);
                  setCategory("");
                  try {
                    const response = await getAllTasks();
                    setTasks(response.data);
                    setMessage(response.message);
                  } catch (error) {
                    setMessage("Erro ao carregar tarefas.");
                  } finally {
                    setLoading(false);
                  }
                }}
                disabled={loading}
                className={`transition-all duration-200 bg-gradient-to-r from-pink-500 to-pink-400 hover:from-pink-600 hover:to-pink-500 text-white font-bold px-5 py-2 rounded-xl shadow-lg ml-2 flex items-center gap-2 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                {loading ? "Buscando..." : "Limpar"}
              </button>
            )}
          </div>
        </div>
        <TaskList tasks={tasks} colors={COLORS} onTaskDeleted={fetchTasks} onTaskUpdated={fetchTasks}/>
      </div>
    </div>
  );
};

export default Tasks;
