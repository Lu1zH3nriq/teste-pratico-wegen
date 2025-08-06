import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Checkbox,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { TaskListProps } from "../../types/taskList";
import ConfirmationDeleteModal from "../utils/confirmationDeleteModal";
import ConfirmationSuccessModal from "../utils/confirmationSucessModal";
import ConfirmationErrorModal from "../utils/confirmationErrorModal";
import EditTaskModal from "../utils/editTaskModal";

export default function TaskList({ tasks, colors, onTaskDeleted, onTaskUpdated}: TaskListProps) {
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<import("../../types/taskList").Taks | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTask, setEditTask] = useState<import("../../types/taskList").Taks | null>(null);

  const handleOpenModal = (task: import("../../types/taskList").Taks) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleOpenEditModal = (task: import("../../types/taskList").Taks) => {
    setEditTask(task);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditTask(null);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTask(null);
  };

  const handleDeleteConfirmed = async () => {
    if (!selectedTask) return;
    const { deleteTask } = await import("../../services/taskService");
    try {
      const response = await deleteTask(selectedTask.id);
      handleCloseModal();
      setModalMessage(response?.message || "Tarefa removida com sucesso.");
      setSuccessModalOpen(true);
      if (onTaskDeleted) onTaskDeleted();
    } catch (error) {
      handleCloseModal();
      setModalMessage("Ocorreu um erro ao remover a tarefa!");
      setErrorModalOpen(true);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center px-2 sm:px-4"
      style={{
        background: `linear-gradient(135deg, ${colors.color1}, ${colors.color2}, ${colors.color3})`,
      }}
    >
      <div
        className="rounded-2xl shadow-xl p-2 sm:p-4 md:p-8 flex flex-col items-center w-full"
        style={{
          background: colors.color2,
          width: "100%",
          maxWidth: "1620px",
          maxHeight: "900px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <TableContainer component={Paper} style={{ background: colors.color6, width: "100%" }}>
          <Table sx={{ minWidth: 320 }} aria-label="tabela de tarefas">
            <TableHead>
              <TableRow style={{ background: colors.color6 }}>
                <TableCell style={{ color: colors.color1, fontWeight: "bold" }}>Concluída</TableCell>
                <TableCell style={{ color: colors.color1, fontWeight: "bold" }}>Título</TableCell>
                <TableCell style={{ color: colors.color1, fontWeight: "bold" }}>Descrição</TableCell>
                <TableCell style={{ color: colors.color1, fontWeight: "bold" }}>Categoria</TableCell>
                <TableCell style={{ color: colors.color1, fontWeight: "bold" }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow
                  key={task.id}
                  style={{ background: task.completed ? colors.color2 : colors.color1 }}
                >
                  <TableCell align="center">
                    <Checkbox
                      checked={task.completed}
                      sx={{
                        color: colors.color4,
                        '&.Mui-checked': { color: colors.color4 },
                      }}
                      
                    />
                  </TableCell>
                  <TableCell style={{ color: colors.color6, fontWeight: "bold" }}>{task.title}</TableCell>
                  <TableCell style={{ color: colors.color6 }}>{task.description}</TableCell>
                  <TableCell style={{ color: colors.color6 }}>{task.category}</TableCell>
                  <TableCell align="center">
                    <IconButton aria-label="editar" size="small" sx={{ color: colors.color4 }} onClick={() => handleOpenEditModal(task)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="excluir" size="small" sx={{ color: colors.color4 }}
                      onClick={() => handleOpenModal(task)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <EditTaskModal
          open={editModalOpen}
          task={editTask}
          onSave={handleCloseEditModal} 
          onCancel={handleCloseEditModal}
          onTasksUpdated={onTaskUpdated}
        />
        <ConfirmationDeleteModal
          open={modalOpen}
          task={selectedTask}
          onConfirm={handleDeleteConfirmed}
          onCancel={handleCloseModal}
        />
        <ConfirmationSuccessModal
          open={successModalOpen}
          message={modalMessage}
          onClose={() => setSuccessModalOpen(false)}
        />
        <ConfirmationErrorModal
          open={errorModalOpen}
          message={modalMessage}
          onClose={() => setErrorModalOpen(false)}
        />
      </div>
    </div>
  );
}