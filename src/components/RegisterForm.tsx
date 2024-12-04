import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, CircularProgress, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../api/apiUser";
import { ErrorResponse } from "../types/response";
import { AuthContext } from "../contexts/AuthContext";
import { registerSchema, RegisterSchema } from "../utils/rules";

type FormData = RegisterSchema;

const RegisterForm = () => {
  const { auth } = React.useContext(AuthContext)!;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassord] = React.useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      await register({
        email: data.email.toLowerCase(),
        password: data.password,
        name: data.name,
      });
      toast.success("Registered successfully");
      navigate("/login");
    } catch (err) {
      const error = err as ErrorResponse;
      toast.error(error?.message || "Something went wrong");
    }
    setIsLoading(false);
  };

  if (auth != null) {
    return <Navigate to="/" replace />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" align="center" fontWeight={"bold"}>
        REGISTER
      </Typography>
      {/* Email input */}
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            style={{ marginTop: "25px" }}
            {...field}
            label="Email"
            fullWidth
            variant="outlined"
            error={!!errors.email}
            placeholder="email@example.com"
            helperText={errors.email?.message}
          />
        )}
      />
      {/* Full Name input */}
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            style={{ marginTop: "20px" }}
            {...field}
            label="Full Name"
            fullWidth
            variant="outlined"
            error={!!errors.name}
            placeholder=""
            helperText={errors.name?.message}
          />
        )}
      />
      {/* Password input */}
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            style={{ marginTop: "20px" }}
            {...field}
            label="Password"
            fullWidth
            variant="outlined"
            error={!!errors.password}
            helperText={errors.password?.message}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ display: field.value ? "flex" : "none" }}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      {/* Confirm password input */}
      <Controller
        name="confirmPassword"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            style={{ marginTop: "20px" }}
            {...field}
            label="Confirm Password"
            fullWidth
            variant="outlined"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            type={showConfirmPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setShowConfirmPassord(!showConfirmPassword)}
                    style={{ display: field.value ? "flex" : "none" }}
                    edge="end"
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: "20px" }}
        size="large"
        disabled={isLoading}
      >
        {isLoading ? (
          <CircularProgress size={30} style={{ color: "white" }} />
        ) : (
          <Typography fontSize={"16px"}>Register</Typography>
        )}
      </Button>
    </form>
  );
};

export default RegisterForm;
