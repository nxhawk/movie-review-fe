import { Box, Paper, Stack, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import benefits from "../constants/benefits.json";

const MemberBenefit = () => {
  return (
    <Paper elevation={3}>
      <Box sx={{ bgcolor: "secondary.main" }} color={"white"} padding={2}>
        <Typography fontSize={"1.2em"} fontWeight={"bold"}>
          Benefits of being a member
        </Typography>
      </Box>
      <Stack padding={2} spacing={1}>
        {benefits["benefits"].map((benefit, idx) => (
          <Stack spacing={1} direction="row" key={idx}>
            <Stack>
              <CheckIcon className="font-bold" />
            </Stack>
            <Stack sx={{ minWidth: 0 }}>
              <Typography fontSize={"0.9em"}>{benefit}</Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
};

export default MemberBenefit;
