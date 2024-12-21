import { Grid, Typography } from "@mui/material";

const ResouceNotFound = () => {
  return (
    <Grid
      container
      justifyContent="center"
      style={{ minHeight: "50vh", marginBottom: "20px", marginTop: "2px" }}
      spacing={4}
    >
      <Grid item xs={11}>
        <Typography variant="h5" fontWeight={"bold"} marginTop={2}>
          Oops! We can&apos;t find the page you&apos;re looking for
        </Typography>
        <Typography variant="body1" align="left" sx={{ mt: 2 }}>
          You tried to request a page that doesn&apos;t exist. If you believe this to be in error, let us know on the
          forums.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ResouceNotFound;
