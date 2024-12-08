import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, CircularProgress, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { setToken } from "../../utils/helper";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ErrorResponse, SuccessResponse } from "../../types/response";
import { AuthContext } from "../../contexts/AuthContext";
import { ILoginUserRes, IFullUser } from "../../types/user";
import { loginSchema, LoginSchema } from "../../utils/rules";
import path from "../../constants/path";
import userApi from "../../api/base/user.api";

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
      const response: SuccessResponse<ILoginUserRes> = await userApi.login({
        email: data.email.toLowerCase(),
        password: data.password,
      });

      // store token to local storage
      setToken(response.data.accessToken, response.data.refreshToken);

      // check valid token and get profile information
      const responseUser: IFullUser = await userApi.profile();

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
      <Typography variant="h5" fontWeight={"bold"}>
        Login to your account
      </Typography>
      <Typography variant="h6" fontSize={"1em"} marginY={2}>
        In order to use the editing and rating capabilities of CINEMATCH, as well as get personal recommendations you
        will need to login to your account. If you do not have an account, registering for an account is free and
        simple.
        <Link to={path.REGISTER} style={{ textDecoration: "none", color: "#0074D9" }}>
          &nbsp;Click here&nbsp;
        </Link>
        to get started.
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
      <Stack spacing={0.5} direction="row" useFlexGap flexWrap="wrap" justifyContent={"right"} marginTop={"16px"}>
        <Link to={path.FORGOT_PASSWORD} style={{ textDecoration: "none", color: "#0074D9" }}>
          Forgot password?
        </Link>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "10px" }}
          size="large"
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={30} style={{ color: "white" }} />
          ) : (
            <Typography fontSize={"16px"}>Login</Typography>
          )}
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
