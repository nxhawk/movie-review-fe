import { Box, Chip, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import List from "@mui/material/List";
import React from "react";

interface SearchResultsProps {
  movieCount: number;
  peopleCount: number;
  selectedType: string;
  // eslint-disable-next-line no-unused-vars
  onSelectType: (type: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ movieCount, peopleCount, selectedType, onSelectType }) => {
  return (
    <Stack direction={"column"} className="w-full text-center border-cyan-200 border rounded-xl h-fit">
      <Box bgcolor={"primary.main"} className="px-3 py-2 rounded-t-xl">
        <Typography
          component="div"
          variant={"caption"}
          sx={{ color: "white", fontWeight: "bold", fontSize: { sm: "0.75rem", md: "1.25rem" } }}
          className="font-mono"
        >
          Search Results
        </Typography>
      </Box>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }} className="rounded-b-xl">
        <List sx={{ flex: 1, flexDirection: { xs: "row", md: "column" } }}>
          <ListItemButton
            component="div"
            sx={{
              "&.Mui-selected": {
                backgroundColor: "rgba(220, 0, 50, 0.1)",
                fontWeight: "bold",
              },
            }}
            selected={selectedType === "movies"}
            onClick={() => onSelectType("movies")}
          >
            <ListItemText primary="Movies" />
            <Chip label={movieCount} />
          </ListItemButton>
          <ListItemButton
            component="div"
            sx={{
              "&.Mui-selected": {
                backgroundColor: "rgba(220, 0, 50, 0.1)",
                fontWeight: "bold",
              },
            }}
            selected={selectedType === "people"}
            onClick={() => onSelectType("people")}
          >
            <ListItemText primary="People" />
            <Chip label={peopleCount} />
          </ListItemButton>
          <ListItemButton
            component="div"
            sx={{
              "&.Mui-selected": {
                backgroundColor: "rgba(220, 0, 50, 0.1)",
                fontWeight: "bold",
              },
            }}
            selected={selectedType === "adv_search"}
            onClick={() => onSelectType("adv_search")}
          >
            <ListItemText primary="Advanced Search" />
          </ListItemButton>
        </List>
      </Box>
    </Stack>
  );
};

export default SearchResults;
