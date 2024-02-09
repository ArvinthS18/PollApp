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
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const theme = createTheme();

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
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Register
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register("username", {
                  required: "Username is required",
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
                required
                autoComplete="off"
                error={!!errors.username}
                helperText={errors.username?.message}
                sx={{ mb: 2 }}
              />
              <TextField
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address",
                  },
                })}
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                required
                autoComplete="off"
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{ mb: 2 }}
              />
              <TextField
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                required
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
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === passwordValue || "Passwords do not match",
                })}
                fullWidth
                label="Confirm Password"
                type="password"
                variant="outlined"
                required
                autoComplete="off"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                sx={{ mb: 2 }}
              />
              <TextField
                {...register("securityQuestion", {
                  required: "Security question is required",
                })}
                select
                fullWidth
                label="Security Question"
                variant="outlined"
                required
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
                  required: "Security answer is required",
                  minLength: {
                    value: 4,
                    message: "Security answer must be 4 characters long",
                  },
                })}
                fullWidth
                label="Security Answer"
                variant="outlined"
                required
                autoComplete="off"
                error={!!errors.securityAnswer}
                helperText={errors.securityAnswer?.message}
                sx={{ mb: 2 }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Register
              </Button>
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
