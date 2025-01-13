import React from "react";
import { Box, Chip, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";

interface SearchTypeSelectorProps {
  movieCount: number;
  peopleCount: number;
  selectedType: string;
  // eslint-disable-next-line no-unused-vars
  onSelectType: (type: string) => void;
}

const SearchTypeSelector: React.FC<SearchTypeSelectorProps> = ({
  movieCount,
  peopleCount,
  selectedType,
  onSelectType,
}) => {
  return (
    <div className="w-full md:w-1/4 flex justify-end px-2 pb-5" id="search-type-selector">
      <Stack
        direction={"column"}
        className="w-full md:w-4/5 md:mr-5 text-center border-cyan-200 border rounded-xl h-fit"
      >
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
          <Stack sx={{ flex: 1, flexDirection: { xs: "row", md: "column" } }}>
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
          </Stack>
        </Box>
      </Stack>
    </div>
  );
};

export default SearchTypeSelector;
