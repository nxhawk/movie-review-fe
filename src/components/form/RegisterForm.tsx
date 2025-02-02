import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, CircularProgress, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { registerSchema, RegisterSchema } from "../../utils/rules";
import path from "../../routes/path";
import toast from "react-hot-toast";
import authApi from "../../api/base/auth.api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

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
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassord] = React.useState(false);

  const signupMutation = useMutation({
    mutationFn: (body: FormData) => authApi.register(body),
    onError: (error: AxiosError) => {
      toast.error(error?.message || "Something went wrong");
    },
    onSuccess: () => {
      toast.success("Registered successfully");
      navigate(path.LOGIN);
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (signupMutation.isPending) return;
    signupMutation.mutate({
      email: data.email.toLowerCase(),
      password: data.password,
      name: data.name,
      confirmPassword: data.confirmPassword,
    });
  };

  if (auth != null) {
    return <Navigate to={path.HOME} replace />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" fontWeight={"bold"}>
        Sign up for an account
      </Typography>
      <Typography variant="h6" fontSize={"1em"} marginY={1}>
        Signing up for an account is free and easy. Fill out the form below to get started. JavaScript is required to to
        continue.
        <Link to={path.LOGIN} style={{ textDecoration: "none", color: "#0074D9" }}>
          &nbsp;Click here&nbsp;
        </Link>
        already have an account?
      </Typography>
      {/* Email input */}
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            style={{ marginTop: "20px" }}
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
      <Typography variant="h6" fontSize={"1em"} marginY={4}>
        By clicking the &quot;Register&quot; button below, I certify that I have read and agree to the terms of use and
        privacy policy.
      </Typography>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        disabled={signupMutation.isPending}
      >
        {signupMutation.isPending ? (
          <CircularProgress size={30} style={{ color: "white" }} />
        ) : (
          <Typography fontSize={"16px"}>Register</Typography>
        )}
      </Button>
    </form>
  );
};

export default RegisterForm;
