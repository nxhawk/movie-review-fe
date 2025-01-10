import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Logo from "../components/common/Logo";
import { linkGroup } from "../constants/linkGroup";
import { Link } from "react-router-dom";
import path from "../routes/path";
import { AuthContext } from "../contexts/AuthContext";
import React from "react";

const Footer = () => {
  const { auth } = React.useContext(AuthContext)!;

  return (
    <Box sx={{ bgcolor: "primary.main", color: "white" }} paddingTop={"30px"} paddingBottom={"70px"} paddingX={"20px"}>
      <Grid container justifyContent="center" flexWrap={"wrap"} spacing={2}>
        <Grid item xs={12} md={4} marginBottom={2}>
          <Stack alignItems="center" justifyContent={{ xs: "space-between", md: "start" }}>
            <Logo />
            <Link to={auth?.email ? path.WATCHLIST : path.LOGIN}>
              <Button
                variant="outlined"
                sx={{ color: "secondary.main", bgcolor: "white", marginTop: "10px", fontWeight: "bold" }}
                className="w-fit"
                size="large"
              >
                {auth?.name ? `Hi ${auth.name}` : "JOIN THE COMMUNITY"}
              </Button>
            </Link>
          </Stack>
        </Grid>
        {linkGroup.map((group) => (
          <Grid item xs={6} md={2} key={group.title}>
            <Stack>
              <Typography variant="h6" fontWeight={"bold"} className="uppercase" marginBottom={1}>
                {group.title}
              </Typography>
              <Stack>
                {group.links.map((link) => (
                  <Link key={link.title} to={link.url} className="w-fit">
                    <Typography variant="h6" fontSize="1em">
                      {link.title}
                    </Typography>
                  </Link>
                ))}
              </Stack>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Footer;
