import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, CircularProgress, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ErrorResponse } from "../../types/response";
import { resetPassword } from "../../api/apiUser";
import { resetPasswordSchema, ResetPasswordSchema } from "../../utils/rules";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = ResetPasswordSchema;

function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    const token = searchParams.get("token");
    try {
      await resetPassword({
        token: token ?? "",
        password: data.password,
      });

      navigate("/login");
      toast.success("Reset password successful");
    } catch (err) {
      const error = err as ErrorResponse;
      toast.error(error?.message || "Something went wrong");
    }
    setIsLoading(false);
  };

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12}>
          <Box>
            <Typography variant="h3" align="center" fontWeight={"bold"} sx={{ color: "#0a2838" }}>
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
              Confirm password
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
          </Box>
        </Grid>
      </Grid>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        disabled={isLoading}
        sx={{
          textTransform: "uppercase",
          mt: 3,
        }}
      >
        {isLoading ? (
          <CircularProgress size={30} style={{ color: "white" }} />
        ) : (
          <Typography fontSize={"16px"}>confirm</Typography>
        )}
      </Button>
    </form>
  );
}

export default ResetPasswordForm;
