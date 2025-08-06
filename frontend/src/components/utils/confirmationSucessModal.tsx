import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface ConfirmationSuccessModalProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

const ConfirmationSuccessModal: React.FC<ConfirmationSuccessModalProps> = ({ open, message, onClose }) => {
  const COLORS = {
    color1: "#e5fec5",
    color2: "#c5fec6",
    color3: "#a3fec7",
    color4: "#29ffc9",
    color5: "#392a35",
    color6: "#242424",
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth
      PaperProps={{
        sx: {
          background: `linear-gradient(135deg, ${COLORS.color1}, ${COLORS.color2}, ${COLORS.color3})`,
          borderRadius: 4,
          boxShadow: 8,
          border: `2px solid ${COLORS.color4}`,
        },
      }}
    >
      <DialogTitle sx={{ px: 4, py: 3, background: COLORS.color6, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <CheckCircleIcon sx={{ color: COLORS.color4, fontSize: 36 }} />
          <Typography variant="h5" fontWeight="bold" color={COLORS.color4} sx={{ letterSpacing: "-1px" }}>
            Sucesso!
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ px: 4, py: 3, background: COLORS.color6 }}>
        <Typography variant="body1" sx={{ mb: 2, color: COLORS.color4, fontWeight: "bold" }}>
          {message}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "flex-end", px: 4, pb: 3, background: COLORS.color6, borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}>
        <Button onClick={onClose} variant="contained" sx={{ borderRadius: 2, fontWeight: "bold", boxShadow: 2, px: 3, py: 1, background: COLORS.color4, color: COLORS.color6, '&:hover': { background: COLORS.color3 } }}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationSuccessModal;
