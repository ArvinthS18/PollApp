/*eslint-disable*/
import React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Link,
  MenuItem,
  IconButton,
  InputAdornment,
  Box,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ResponsiveAppBar from "./ResponsiveAppBar";
const theme = createTheme({
  typography: {
    fontFamily: '"Roboto Mono", monospace',
  },
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});

const API_URL = "https://657aaf5e1acd268f9afb9276.mockapi.io/api/v1/register";

const defaultSecurityQuestions = [
  "What is your mother's maiden name?",
  "What city were you born in?",
  "What is your favorite movie?",
  "What is your pet's name?",
];

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const passwordValue = watch("password");

  const onSubmit = async (formData) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Registered successfully!");
        console.log(data);
        reset();
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred");
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <ResponsiveAppBar />
      <Container
        maxWidth="sm"
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* <Typography variant="h4" color="primary" align="center" gutterBottom>
            Edit Password
          </Typography> */}
        <Typography variant="h4" align="center" gutterBottom color="primary">
          Register
        </Typography>
        <Card sx={{ backgroundColor: "#ffffff", boxShadow: 6 }}>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register("username", {
                  minLength: {
                    value: 4,
                    message: "Username must be at least 4 characters",
                  },
                  maxLength: {
                    value: 12,
                    message: "Username cannot exceed 12 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,12}$/,
                    message:
                      "Username must contain at least one letter and one number",
                  },
                })}
                fullWidth
                label="Username"
                variant="outlined"
                autoComplete="off"
                error={!!errors.username}
                helperText={errors.username?.message}
                sx={{ mb: 2 }}
              />
              <TextField
                {...register("email", {
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address",
                  },
                })}
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                autoComplete="off"
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{ mb: 2 }}
              />
              <TextField
                {...register("password", {
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                autoComplete="off"
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === passwordValue || "Passwords do not match",
                })}
                fullWidth
                label="Confirm Password"
                type="password"
                variant="outlined"
                autoComplete="off"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                sx={{ mb: 2 }}
              />
              <TextField
                {...register("securityQuestion")}
                select
                fullWidth
                label="Security Question"
                variant="outlined"
                autoComplete="off"
                error={!!errors.securityQuestion}
                helperText={errors.securityQuestion?.message}
                sx={{ mb: 2 }}
              >
                {defaultSecurityQuestions.map((question, index) => (
                  <MenuItem key={index} value={question}>
                    {question}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                {...register("securityAnswer", {
                  minLength: {
                    value: 4,
                    message: "Security answer must be 4 characters long",
                  },
                })}
                fullWidth
                label="Security Answer"
                variant="outlined"
                autoComplete="off"
                error={!!errors.securityAnswer}
                helperText={errors.securityAnswer?.message}
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ width: "20%" }}
                >
                  Register
                </Button>
              </Box>
              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Already have an account?{" "}
                <Link href="/login" color="primary">
                  Log in
                </Link>
              </Typography>
            </form>
          </CardContent>
        </Card>
      </Container>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default Register;
