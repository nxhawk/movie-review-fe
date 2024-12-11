import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "../../utils/rules";
import { zodResolver } from "@hookform/resolvers/zod";
import userApi from "../../api/base/user.api";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

type FormData = Pick<LoginSchema, "email">;
const forgotPasswordSchema = loginSchema.pick({ email: true });

function ForgotPasswordForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (email: string) => userApi.forgotPassword(email),
    onError: (error: AxiosError) => {
      toast.error(error?.message || "Something went wrong");
    },
    onSuccess: () => {
      toast.success("Check mail to reset password");
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (forgotPasswordMutation.isPending) return;
    forgotPasswordMutation.mutate(data.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" fontWeight={"bold"} marginTop={5}>
        Forgot password?
      </Typography>
      <Typography variant="body1" align="left" sx={{ mt: 1 }}>
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
        disabled={forgotPasswordMutation.isPending}
      >
        {forgotPasswordMutation.isPending ? (
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
