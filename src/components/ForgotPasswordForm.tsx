import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { ErrorResponse } from "../types/response";
import { toast } from "react-toastify";
import { forgotPassword } from "../api/apiUser";
import { loginSchema, LoginSchema } from "../utils/rules";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = Pick<LoginSchema, "email">;
const forgotPasswordSchema = loginSchema.pick({ email: true });

function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      await forgotPassword(data.email.toLowerCase());

      toast.success("Check mail to reset password");
    } catch (err) {
      const error = err as ErrorResponse;
      toast.error(error?.message || "Something went wrong");
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h3" align="center" fontWeight={"bold"} sx={{ color: "#0a2838" }}>
        Forgot password?
      </Typography>
      <Typography variant="body1" align="left" sx={{ color: "gray", mt: 3 }}>
        Enter the email you signed up with. We&apos;ll send you a link to log in and reset your password.
      </Typography>

      <Typography variant="body1" align="left" fontWeight={"bold"} sx={{ color: "primary", mt: 3 }}>
        Email
      </Typography>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            sx={{ mt: 1 }}
            {...field}
            hiddenLabel
            fullWidth
            type="email"
            variant="filled"
            error={!!errors.email}
            placeholder="email@example.com"
            helperText={errors.email?.message}
            InputProps={{
              sx: { backgroundColor: "white" },
            }}
          />
        )}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{
          marginTop: "32px",
          borderRadius: "10px",
          padding: "10px",
          textTransform: "none",
        }}
        size="large"
        disabled={isLoading}
      >
        {isLoading ? (
          <CircularProgress size={30} style={{ color: "white" }} />
        ) : (
          <Typography fontSize={"16px"} variant="body1">
            Send link
          </Typography>
        )}
      </Button>
    </form>
  );
}

export default ForgotPasswordForm;
