import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, CircularProgress, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { setToken } from "../utils/helper";
import { Navigate, useNavigate } from "react-router-dom";
import { login, profile } from "../api/apiUser";
import { toast } from "react-toastify";
import { ErrorResponse, SuccessResponse } from "../types/response";
import { AuthContext } from "../contexts/AuthContext";
import { ILoginUserRes, IFullUser } from "../types/user";
import { loginSchema, LoginSchema } from "../utils/rules";

type FormData = LoginSchema;

const LoginForm = () => {
  const { auth, changeAuth } = React.useContext(AuthContext)!;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      const response: SuccessResponse<ILoginUserRes> = await login({
        email: data.email.toLowerCase(),
        password: data.password,
      });

      // store token to local storage
      setToken(response.data.accessToken, response.data.refreshToken);

      // check valid token and get profile information
      const responseUser: IFullUser = await profile();

      changeAuth({ ...responseUser });
      toast.success("Login successfully");
      navigate("/");
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
        LOGIN
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
          <Typography fontSize={"16px"}>Login</Typography>
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
