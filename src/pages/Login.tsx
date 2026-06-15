import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "../types/loginSchema";
import type { User } from "../types/schema";

export const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    mode: "all",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    setLoginError("");

    const storedUsers = localStorage.getItem("users");

    if (!storedUsers) {
      setLoginError("No Users found. Please sign up first.");
      return;
    }

    const users: User[] = JSON.parse(storedUsers);
    const validUser = users.find(
      (user) =>
        user.email.toLowerCase() === data.email.toLowerCase() &&
        user.password === data.password,
    );

    if (!validUser) {
      setLoginError("Invalid email or password.");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(validUser));

    navigate("/profile", { replace: true });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 8,
        p: 4,
        borderRadius: 3,
      }}
    >
      <Stack component="form" spacing={3} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" align="center">
          Login
        </Typography>

        {loginError && <Alert severity="error">{loginError}</Alert>}

        <TextField
          {...register("email")}
          label="Email"
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          {...register("password")}
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          error={!!errors.password}
          helperText={errors.password?.message}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isSubmitting}
        >
          Login
        </Button>

        <Typography variant="body2" align="center" color="text.secondary">
          Not a member?{" "}
          <Link
            component="button"
            type="button"
            underline="hover"
            onClick={() => navigate("/signup")}
          >
            Signup here
          </Link>
        </Typography>
      </Stack>
    </Paper>
  );
};
