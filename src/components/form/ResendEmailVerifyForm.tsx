import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "../../utils/rules";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import authApi from "../../api/base/auth.api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

type FormData = Pick<LoginSchema, "email">;
const forgotPasswordSchema = loginSchema.pick({ email: true });

const ResendEmailVerifyForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const resendConfirmEmailMutation = useMutation({
    mutationFn: (email: string) => authApi.resendEmailVerify(email),
    onError: (error: AxiosError) => {
      toast.error(error?.message || "Something went wrong");
    },
    onSuccess: () => {
      toast.success("Resend confirm email successfully");
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (resendConfirmEmailMutation.isPending) return;
    resendConfirmEmailMutation.mutate(data.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" fontWeight={"bold"} marginTop={5}>
        Resend activation email
      </Typography>
      <Typography variant="body1" align="left" sx={{ mt: 1 }}>
        Missing your account verification email? Enter your email below to have it resent.
      </Typography>

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
        disabled={resendConfirmEmailMutation.isPending}
      >
        {resendConfirmEmailMutation.isPending ? (
          <CircularProgress size={30} style={{ color: "white" }} />
        ) : (
          <Typography fontSize={"16px"} variant="body1">
            Send
          </Typography>
        )}
      </Button>
    </form>
  );
};

export default ResendEmailVerifyForm;
