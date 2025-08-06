import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Taks } from "../../types/taskList";

interface ConfirmationDeleteModalProps {
  open: boolean;
  task: Taks | null;
  onConfirm: () => Promise<void> | void;
  onCancel: () => void;
}

const ConfirmationDeleteModal: React.FC<ConfirmationDeleteModalProps> = ({
  open,
  task,
  onConfirm,
  onCancel,
}) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
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
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          background: `linear-gradient(135deg, ${COLORS.color1}, ${COLORS.color2}, ${COLORS.color3})`,
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
          <DeleteIcon sx={{ color: COLORS.color4, fontSize: 36 }} />
          <Typography
            variant="h5"
            fontWeight="bold"
            color={COLORS.color4}
            sx={{ letterSpacing: "-1px" }}
          >
            Confirmar Exclusão
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ px: 4, py: 3, background: COLORS.color6 }}>
        <Typography
          variant="body1"
          sx={{ mb: 2, color: COLORS.color4, fontWeight: "bold" }}
        >
          Você realmente deseja remover a task?
        </Typography>
        <Box
          p={2}
          bgcolor={COLORS.color1}
          borderRadius={2}
          boxShadow={2}
          border={`1.5px solid ${COLORS.color3}`}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color={COLORS.color4}
          >
            {task?.title}
          </Typography>
          <Typography variant="body2" sx={{ color: COLORS.color5 }}>
            {task?.description}
          </Typography>
          <Typography variant="caption" sx={{ color: COLORS.color5 }}>
            Categoria: {task?.category}
          </Typography>
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
          onClick={handleConfirm}
          variant="contained"
          sx={{
            borderRadius: 2,
            fontWeight: "bold",
            boxShadow: 2,
            minWidth: 120,
            px: 3,
            py: 1,
            background: loading ? COLORS.color3 : COLORS.color4 ,
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
                background: COLORS.color3 
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
              Excluindo...
            </span>
          ) : (
            "Confirmar"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDeleteModal;
