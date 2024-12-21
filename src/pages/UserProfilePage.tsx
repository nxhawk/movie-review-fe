import { Paper, Grid, Typography, CircularProgress } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IFullUser } from "../types/user.type";
import path from "../routes/path";
import DocumentMeta from "react-document-meta";
import metadata from "../utils/metadata";
import toast from "react-hot-toast";
import authApi from "../api/base/auth.api";
import { useQuery } from "@tanstack/react-query";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<IFullUser | null>(null);

  const getMeQuery = useQuery({
    queryKey: ["profile"],
    queryFn: authApi.profile,
    gcTime: 0,
  });

  React.useEffect(() => {
    if (getMeQuery.isSuccess) {
      const profile: IFullUser = getMeQuery.data;
      setUser(profile);
      metadata.profileMeta.title = `${profile.name} - Profile Page`;
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

  return (
    <DocumentMeta {...metadata.profileMeta}>
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "80vh" }}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper elevation={3} style={{ padding: "32px" }}>
            {getMeQuery.isLoading ? (
              <div style={{ textAlign: "center" }}>
                <CircularProgress size={30} />
              </div>
            ) : (
              <>
                <Typography variant="h4" style={{ textAlign: "center", marginBottom: "20px" }}>
                  Profile
                </Typography>
                <div>
                  <Typography variant="body1" style={{ textAlign: "center" }}>
                    Email: {user?.email}
                  </Typography>
                </div>
                <div>
                  <Typography variant="body1" style={{ textAlign: "center" }}>
                    FullName: {`${user?.name}`}
                  </Typography>
                </div>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </DocumentMeta>
  );
};

export default UserProfilePage;
