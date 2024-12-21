import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, CircularProgress, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPasswordSchema, ResetPasswordSchema } from "../../utils/rules";
import { zodResolver } from "@hookform/resolvers/zod";
import path from "../../routes/path";
import userApi from "../../api/base/user.api";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

type FormData = ResetPasswordSchema;

function ResetPasswordForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const resetPasswordMutation = useMutation({
    mutationFn: ({ token, password }: { token: string; password: string }) =>
      userApi.resetPassword({ token, password }),
    onError: (error: AxiosError) => {
      toast.error(error?.message || "Something went wrong");
    },
    onSuccess: () => {
      navigate(path.LOGIN);
      toast.success("Reset password successful");
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (resetPasswordMutation.isPending) return;
    const token = searchParams.get("token");
    if (!token) {
      toast.error("No token found");
      return;
    }
    resetPasswordMutation.mutate({
      token: token ?? "",
      password: data.password,
    });
  };

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" fontWeight={"bold"} marginTop={5}>
        Reset your password
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: "bold", display: "block", mt: 4 }}>
        New Password
      </Typography>

      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            hiddenLabel
            fullWidth
            placeholder="New Password"
            variant="outlined"
            error={!!errors.password}
            helperText={errors.password?.message}
            type={showNewPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    style={{ display: field.value ? "flex" : "none" }}
                    edge="end"
                  >
                    {showNewPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      <Typography variant="body1" sx={{ fontWeight: "bold", display: "block", mt: 2 }}>
        Confirm Password
      </Typography>
      <Controller
        name="confirmPassword"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            hiddenLabel
            fullWidth
            variant="outlined"
            placeholder="Confirm Password"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            type={showConfirmNewPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                    style={{ display: field.value ? "flex" : "none" }}
                    edge="end"
                  >
                    {showConfirmNewPassword ? <Visibility /> : <VisibilityOff />}
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
        size="large"
        fullWidth
        disabled={resetPasswordMutation.isPending}
        sx={{
          textTransform: "uppercase",
          my: 3,
        }}
      >
        {resetPasswordMutation.isPending ? (
          <CircularProgress size={30} style={{ color: "white" }} />
        ) : (
          <Typography fontSize={"16px"}>confirm</Typography>
        )}
      </Button>
    </form>
  );
}

export default ResetPasswordForm;
