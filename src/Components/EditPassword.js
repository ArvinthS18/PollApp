/*eslint-disable*/
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Link,
  Box,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResponsiveAppBar from "./ResponsiveAppBar";

const theme = createTheme({
  typography: {
    fontFamily: "'Roboto Mono', monospace",
  },
});

const API_URL = "https://657aaf5e1acd268f9afb9276.mockapi.io/api/v1/register";

const EditPassword = () => {
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${API_URL}/${data.id}`);
      const responseData = await response.json();
      if (response.ok && responseData.username === data.username) {
        const updateResponse = await fetch(`${API_URL}/${data.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: data.newPassword }),
        });
        const updateData = await updateResponse.json();
        if (updateResponse.ok) {
          toast.success("Password updated successfully!");
          setOpenDialog(true);
          reset();
        } else {
          setError(updateData.error || "Password update failed");
        }
      } else {
        setError("User ID or Username is incorrect");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred");
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <ResponsiveAppBar />
      <Container
        maxWidth="sm"
        sx={{
          mt: 4,
          height: "75vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h4" color="primary" align="center" gutterBottom>
            Edit Password
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Card sx={{ backgroundColor: "#ffffff", boxShadow: 6 }}>
            <CardContent>
              {error && (
                <Typography
                  variant="body2"
                  color="error"
                  align="center"
                  sx={{ mb: 2 }}
                >
                  {error}
                </Typography>
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  fullWidth
                  label="User ID"
                  name="id"
                  type="number"
                  {...register("id", { required: true, pattern: /^[0-9]+$/ })}
                  error={!!errors.id}
                  helperText={errors.id ? "Please enter a valid user ID" : ""}
                  variant="outlined"
                  autoComplete="off"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  {...register("username", { required: true })}
                  error={!!errors.username}
                  helperText={errors.username ? "Please enter a username" : ""}
                  variant="outlined"
                  autoComplete="off"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="New Password"
                  name="newPassword"
                  type="password"
                  {...register("newPassword", { required: true, minLength: 6 })}
                  error={!!errors.newPassword}
                  helperText={
                    errors.newPassword
                      ? "Password must be at least 6 characters"
                      : ""
                  }
                  variant="outlined"
                  autoComplete="off"
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ width: "20%" }}
                  >
                    Update
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Box>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Back to{" "}
          <Link href="/login" color="primary">
            Login?
          </Link>
        </Typography>
      </Container>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          <Typography variant="h6" color="primary">
            Password Updated
          </Typography>
          <Box borderBottom={1} mt={1} mb={2} borderColor="primary.main" />
        </DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Your password has been updated successfully.
          </Typography>
          <Typography>
            Click{" "}
            <Link href="/login" color="primary">
              here
            </Link>{" "}
            to go back to the login page.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default EditPassword;
