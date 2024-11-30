import { Paper, Grid, Typography, CircularProgress } from "@mui/material";
import React from "react";
import { profile } from "../api/apiUser";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IFullUser } from "../types/user";

const UserProfilePage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const [user, setUser] = React.useState<IFullUser | null>(null);

  React.useEffect(() => {
    async function getProfile() {
      setIsLoading(true);
      try {
        const response = await profile();
        setUser(response as IFullUser);
        // set current user
      } catch (err) {
        toast.error("AcessToken has expired");
        navigate("/login", { replace: true });
      }
      setIsLoading(false);
    }
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
  );
};

export default UserProfilePage;
