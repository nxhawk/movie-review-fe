import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, CircularProgress, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { setToken } from "../../utils/helper";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { IFullUser, AuthQueryConfig, ILoginUserRes } from "../../types/user.type";
import { loginSchema, LoginSchema } from "../../utils/rules";
import path from "../../constants/path";
import toast from "react-hot-toast";
import useQueryString from "../../hooks/useQueryString";
import authApi from "../../api/base/auth.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { SuccessResponse } from "../../types/response.type";

type FormData = LoginSchema;

const LoginForm = () => {
  const { auth, changeAuth } = React.useContext(AuthContext)!;
  const queryString: AuthQueryConfig = useQueryString();
  const queryConfig: AuthQueryConfig = {
    access_token: queryString.access_token || "",
    refresh_token: queryString.refresh_token || "",
  };
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

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

  const signinMutation = useMutation({
    mutationFn: (body: FormData) => authApi.login(body),
    onError: (error: AxiosError) => {
      toast.error(error?.message || "Something went wrong");
    },
    onSuccess: (response: SuccessResponse<ILoginUserRes>) => {
      setToken(response.data.accessToken, response.data.refreshToken);
    },
  });

  const getMeQuery = useQuery({
    queryKey: ["me"],
    queryFn: authApi.profile,
    enabled: signinMutation.isSuccess,
    gcTime: 0,
  });

  React.useEffect(() => {
    if (getMeQuery.isSuccess) {
      const profile: IFullUser = getMeQuery.data;
      console.log(profile);
      changeAuth({ ...profile });
      toast.success("Login successfully");
      navigate(path.HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getMeQuery.isSuccess]);

  React.useEffect(() => {
    if (getMeQuery.isError) {
      toast.error("AcessToken has expired");
      navigate(path.LOGIN, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getMeQuery.isError]);

  React.useEffect(() => {
    if (queryConfig.access_token && queryConfig.refresh_token) {
      // store token to local storage
      setToken(queryConfig.access_token, queryConfig.refresh_token);
      // check valid token and get profile information
      getMeQuery.refetch();
    }
  }, [getMeQuery, queryConfig.access_token, queryConfig.refresh_token]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (signinMutation.isPending || getMeQuery.isFetching) return;
    signinMutation.mutate(data);
  };

  if (auth != null) {
    return <Navigate to={path.HOME} replace />;
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
      <Typography variant="h6" fontSize={"1em"} marginY={2}>
        If you signed up but didn&apos;t get your verification email,
        <Link to={path.RESEND_EMAIL_VERIFYCATION} style={{ textDecoration: "none", color: "#0074D9" }}>
          &nbsp;click here&nbsp;
        </Link>
        to have it resent.
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
          disabled={signinMutation.isPending}
        >
          {signinMutation.isPending ? (
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
