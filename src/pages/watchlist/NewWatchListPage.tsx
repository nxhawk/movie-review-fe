import DocumentMeta from "react-document-meta";
import metadata from "../../utils/metadata";
import {
  Button,
  CircularProgress,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { watchListSchema, WatchListSchema } from "../../utils/rules";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import watchlistApi from "../../api/base/watchlist.api";
import { useNavigate } from "react-router-dom";
import path from "../../routes/path";

type FormData = WatchListSchema;

const NewWatchListPage = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(watchListSchema),
  });

  const createWatchListMutation = useMutation({
    mutationFn: (body: FormData) => watchlistApi.createNewWatchlist(body),
    onError: (error: AxiosError) => {
      toast.error(error?.message || "Something went wrong");
    },
    onSuccess: () => {
      toast.success("New watch list created successfully");
      navigate(path.WATCHLIST);
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    createWatchListMutation.mutate(data);
  };

  return (
    <DocumentMeta {...metadata.addNewWatchListMeta}>
      <Grid
        container
        justifyContent="center"
        style={{ minHeight: "85vh", marginBottom: "20px", marginTop: "5px" }}
        spacing={4}
      >
        <Grid item xs={11}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5" fontWeight={"bold"}>
              Create New List
            </Typography>
            {/* Name field */}
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <InputLabel sx={{ marginTop: "25px", marginBottom: "5px" }} id="input-name">
                    Name
                  </InputLabel>
                  <TextField
                    id="input-name"
                    {...field}
                    fullWidth
                    variant="outlined"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                </>
              )}
            />
            {/* Description field */}
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <InputLabel sx={{ marginTop: "25px", marginBottom: "5px" }} id="input-description">
                    Description
                  </InputLabel>
                  <TextField
                    multiline
                    rows={2}
                    id="input-description"
                    {...field}
                    fullWidth
                    variant="outlined"
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                </>
              )}
            />
            {/* public or private */}
            <Controller
              name="isPublic"
              control={control}
              defaultValue={true}
              render={({ field }) => (
                <>
                  <InputLabel sx={{ marginTop: "25px", marginBottom: "5px" }} id="select-public">
                    Public List?
                  </InputLabel>
                  <Select
                    labelId="select-public"
                    style={{ width: "100%" }}
                    error={!!errors.isPublic}
                    value={field.value ? 1 : 0}
                    onChange={(e) => field.onChange(e.target.value ? true : false)}
                    sx={{ background: "#f5f7f8" }}
                  >
                    <MenuItem value={1}>Yes</MenuItem>
                    <MenuItem value={0}>No</MenuItem>
                  </Select>
                  {errors.isPublic && <FormHelperText error>{errors.isPublic.message}</FormHelperText>}
                </>
              )}
            />
            <Button
              type="submit"
              variant="contained"
              style={{ marginTop: "32px" }}
              fullWidth
              size="large"
              disabled={createWatchListMutation.isPending}
            >
              {createWatchListMutation.isPending ? (
                <CircularProgress size={30} style={{ color: "white" }} />
              ) : (
                <Typography fontSize={"16px"}>Create</Typography>
              )}
            </Button>
          </form>
        </Grid>
      </Grid>
    </DocumentMeta>
  );
};

export default NewWatchListPage;
