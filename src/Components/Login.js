import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Link,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme();

const API_URL = "https://657aaf5e1acd268f9afb9276.mockapi.io/api/v1/register";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const user = data.find(
        (user) =>
          user.username === formData.username &&
          user.password === formData.password
      );
      if (user) {
        // Login successful, show success message using toast
        toast.success("Login successful!");
        // Clear input fields
        setFormData({ username: "", password: "" });
        // Optionally, you can redirect to another page after login
        // history.push("/dashboard");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred");
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
        <Card>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Login
            </Typography>
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
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                variant="outlined"
                required
                sx={{ mb: 2 }}
                autoComplete="off" // Disable autocomplete
                InputProps={{ disableUnderline: true }} // Remove the underline
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                required
                sx={{ mb: 2 }}
                autoComplete="off" // Disable autocomplete
                InputProps={{ disableUnderline: true }} // Remove the underline
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Log in
              </Button>
              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                <Link href="/editpassword" color="primary">
                  Forgot password?
                </Link>
              </Typography>
            </form>
          </CardContent>
        </Card>
        {/* Sign up link */}
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Link href="/" color="primary">
            Sign up
          </Link>
        </Typography>
      </Container>
      {/* Toast container to display toast messages */}
      <ToastContainer />
    </ThemeProvider>
  );
};

export default Login;
