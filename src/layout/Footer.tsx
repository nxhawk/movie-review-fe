import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Logo from "../components/common/Logo";
import { linkGroup } from "../constants/linkGroup";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "primary.main", color: "white" }} paddingTop={"30px"} paddingBottom={"70px"} paddingX={"20px"}>
      <Grid container justifyContent="center" flexWrap={"wrap"} spacing={3}>
        <Grid item xs={12} md={4}>
          <Stack
            flexDirection={{ xs: "row", md: "column" }}
            alignItems="center"
            justifyContent={{ xs: "space-between", md: "start" }}
          >
            <Logo />
            <Button
              variant="outlined"
              sx={{ color: "secondary.main", bgcolor: "white", marginTop: "10px", fontWeight: "bold" }}
              className="w-fit"
              size="large"
            >
              JOIN THE COMMUNITY
            </Button>
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
