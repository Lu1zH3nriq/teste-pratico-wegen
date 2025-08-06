import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { SelectChangeEvent } from "@mui/material/Select";
import { Taks, TaskListProps } from "../../types/taskList";
import axios from "axios";
import ConfirmationSuccessModal from "./confirmationSucessModal";
import ConfirmationErrorModal from "./confirmationErrorModal";

interface EditTaskModalProps {
  open: boolean;
  task: Taks | null;
  onSave?: (updatedTask: Taks) => void;
  onCancel: () => void;
  onTasksUpdated?: () => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  open,
  task,
  onSave,
  onCancel,
  onTasksUpdated,
}) => {
  const [form, setForm] = useState<Taks | null>(null);
  const [loading, setLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    setForm(task);
  }, [task]);

  if (!form) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleStatusChange = (e: SelectChangeEvent) => {
    const value = e.target.value === "completed";
    setForm((prev) => (prev ? { ...prev, completed: value } : prev));
  };

  const handleSave = async () => {
    if (!form) return;
    setLoading(true);
    try {
      const payload = {
        title: form.title,
        description: form.description,
        category: form.category,
        isCompleted: form.completed,
      };

      const token = localStorage.getItem("token");

      const axiosConfig = {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      };

      const response = await axios.put(
        `http://localhost:5289/api/Tasks/${form.id}`,
        payload,
        axiosConfig
      );

      const result = response.data;
      if (response.status === 200 && result.status === 200) {
        setModalMessage(result.message || "Tarefa atualizada com sucesso.");
        setSuccessModalOpen(true);

        if (onTasksUpdated) {
          onTasksUpdated();
        }
      } else {
        setModalMessage(result.message || "Erro ao atualizar tarefa.");
        setErrorModalOpen(true);
      }
    } catch (error: any) {
      setModalMessage(
        error?.response?.data?.message || "Erro ao atualizar tarefa."
      );
      setErrorModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = {
    color1: "#e5fec5",
    color2: "#c5fec6",
    color3: "#a3fec7",
    color4: "#29ffc9",
    color5: "#392a35",
    color6: "#242424",
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onCancel}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: loading
              ? COLORS.color3
              : `linear-gradient(135deg, ${COLORS.color1}, ${COLORS.color2}, ${COLORS.color3})`,
            borderRadius: 4,
            boxShadow: 8,
            border: `2px solid ${COLORS.color4}`,
          },
        }}
      >
        <DialogTitle
          sx={{
            px: 4,
            py: 3,
            background: COLORS.color6,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <EditIcon sx={{ color: COLORS.color4, fontSize: 36 }} />
            <Typography
              variant="h5"
              fontWeight="bold"
              color={COLORS.color4}
              sx={{ letterSpacing: "-1px" }}
            >
              Editar Tarefa
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ px: 4, py: 3, background: COLORS.color6 }}>
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              label="Título"
              name="title"
              value={form.title}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{
                background: COLORS.color1,
                borderRadius: 2,
                input: { color: COLORS.color6, fontWeight: "bold" },
                label: { color: COLORS.color4 },
                boxShadow: `0 2px 8px ${COLORS.color2}33`,
                border: `1.5px solid ${COLORS.color3}`,
              }}
              InputLabelProps={{
                style: { color: COLORS.color5, marginTop: "10px" },
              }}
            />
            <TextField
              label="Categoria"
              name="category"
              value={form.category}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{
                background: COLORS.color1,
                borderRadius: 2,
                input: { color: COLORS.color6, fontWeight: "bold" },
                label: { color: COLORS.color4 },
                boxShadow: `0 2px 8px ${COLORS.color2}33`,
                border: `1.5px solid ${COLORS.color3}`,
              }}
              InputLabelProps={{
                style: { color: COLORS.color5, marginTop: "10px" },
              }}
            />
            <TextField
              label="Descrição"
              name="description"
              value={form.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              sx={{
                background: COLORS.color1,
                borderRadius: 2,
                input: { color: COLORS.color6 },
                label: { color: COLORS.color4 },
                boxShadow: `0 2px 8px ${COLORS.color2}33`,
                border: `1.5px solid ${COLORS.color3}`,
              }}
              InputLabelProps={{
                style: { color: COLORS.color5, marginTop: "10px" },
              }}
            />
            <FormControl
              fullWidth
              variant="outlined"
              sx={{
                background: COLORS.color1,
                borderRadius: 2,
                boxShadow: `0 2px 8px ${COLORS.color2}33`,
                border: `1.5px solid ${COLORS.color3}`,
              }}
            >
              <InputLabel
                id="status-label"
                sx={{ color: COLORS.color5, marginTop: "10px" }}
              >
                Status
              </InputLabel>
              <Select
                labelId="status-label"
                value={form.completed ? "completed" : "pending"}
                label="Status"
                onChange={handleStatusChange}
                sx={{ color: COLORS.color6, fontWeight: "bold" }}
              >
                <MenuItem
                  value="pending"
                  sx={{ color: COLORS.color5, fontWeight: "bold" }}
                >
                  Pendente
                </MenuItem>
                <MenuItem
                  value="completed"
                  sx={{ color: COLORS.color4, fontWeight: "bold" }}
                >
                  Finalizada
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "space-between",
            px: 4,
            pb: 3,
            background: COLORS.color6,
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
          }}
        >
          <Button
            onClick={onCancel}
            variant="outlined"
            sx={{
              borderRadius: 2,
              fontWeight: "bold",
              color: COLORS.color6,
              borderColor: COLORS.color4,
              px: 3,
              py: 1,
              background: COLORS.color1,
              "&:hover": { background: COLORS.color2 },
            }}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              borderRadius: 2,
              fontWeight: "bold",
              boxShadow: 2,
              px: 3,
              py: 1,
              background: COLORS.color4,
              color: COLORS.color6,
              "&:hover": { background: COLORS.color3 },
            }}
            disabled={loading}
          >
            {loading ? (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  className="animate-spin"
                  style={{ height: 22, width: 22, marginRight: 8 }}
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
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Salvando...
              </span>
            ) : (
              "Salvar"
            )}
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmationSuccessModal
        open={successModalOpen}
        message={modalMessage}
        onClose={() => {
          setSuccessModalOpen(false);
          if (onSave) onSave(form);
          onCancel();
        }}
      />
      <ConfirmationErrorModal
        open={errorModalOpen}
        message={modalMessage}
        onClose={() => setErrorModalOpen(false)}
      />
    </>
  );
};

export default EditTaskModal;
