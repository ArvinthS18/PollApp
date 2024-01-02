import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";

const StyledDialog = styled(Dialog)`
  .MuiDialogTitle-root {
    background-color: #1976d2;
    color: white;
  }

  .MuiTypography-body1 {
    color: #333;
    margin-bottom: 15px; /* Add margin bottom for spacing */
  }

  .MuiDialogContent-root {
    margin-top: 20px; /* Add margin top for spacing */
  }

  .MuiButton-root {
    background-color: #1976d2;
    color: white;

    &:hover {
      background-color: #135ba1;
    }
  }
`;

function WelcomeModal({ open, onClose, title, children }) {
  return (
    <StyledDialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent style={{ textAlign: "center" }}>
        <Typography variant="body1" gutterBottom>
          {children}
        </Typography>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogContent>
    </StyledDialog>
  );
}

export default WelcomeModal;
