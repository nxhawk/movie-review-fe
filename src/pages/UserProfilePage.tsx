import { Paper, Grid, Typography, CircularProgress } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IFullUser } from "../types/user";
import path from "../constants/path";
import userApi from "../api/base/user.api";
import DocumentMeta from "react-document-meta";
import metadata from "../utils/metadata";

const UserProfilePage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const [user, setUser] = React.useState<IFullUser | null>(null);

  React.useEffect(() => {
    async function getProfile() {
      setIsLoading(true);
      try {
        const response = await userApi.profile();
        setUser(response as IFullUser);
        metadata.profileMeta.title = `${response.name} - Profile Page`;
        // set current user
      } catch (err) {
        toast.error("AcessToken has expired");
        navigate(path.LOGIN, { replace: true });
      }
      setIsLoading(false);
    }
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DocumentMeta {...metadata.profileMeta}>
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "80vh" }}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper elevation={3} style={{ padding: "32px" }}>
            {isLoading ? (
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
