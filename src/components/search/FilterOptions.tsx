import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Box, Button, Chip, FormControl, MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Slider from "@mui/material/Slider";
import movieApi from "../../api/base/movie.api.ts";
import { Dayjs } from "dayjs";
import { Genre } from "../../types/movie.type.ts";

interface FilterOptionsProps {
  // eslint-disable-next-line no-unused-vars
  onApplyFilters: (params: any) => void;
  onClearFilters: () => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({ onApplyFilters, onClearFilters }) => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [value, setValue] = useState<number[]>([0, 10]);
  const [sortValue, setSortValue] = useState<string | undefined>("popularity.desc");
  const [releaseDateFrom, setReleaseDateFrom] = useState<Dayjs | null>(null);
  const [releaseDateTo, setReleaseDateTo] = useState<Dayjs | null>(null);

  const marks = [
    { value: 0, label: "0" },
    { value: 2, label: "2" },
    { value: 4, label: "4" },
    { value: 6, label: "6" },
    { value: 8, label: "8" },
    { value: 10, label: "10" },
  ];

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await movieApi.getMovieGenres();
      setGenres(response.genres);
    };
    fetchGenres().then();
  }, []);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    applyFilters();
  };

  const handleChipClick = (genreId: number) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
    applyFilters();
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    const validSortValues = [
      "popularity.asc",
      "popularity.desc",
      "primary_release_date.asc",
      "primary_release_date.desc",
      "title.asc",
      "title.desc",
      "vote_average.asc",
      "vote_average.desc",
    ];
    if (validSortValues.includes(value)) {
      setSortValue(value);
      applyFilters();
    }
  };

  const handleDateChange = (setter: React.Dispatch<React.SetStateAction<Dayjs | null>>) => (newValue: Dayjs | null) => {
    setter(newValue);
    applyFilters();
  };

  const applyFilters = () => {
    const params: any = {
      sort_by: sortValue,
      "vote_average.gte": value[0],
      "vote_average.lte": value[1],
    };

    if (selectedGenres.length > 0) {
      params["with_genres"] = selectedGenres.join(",");
    }

    if (releaseDateFrom) {
      params["release_date.gte"] = releaseDateFrom.format("YYYY-MM-DD");
    }
    if (releaseDateTo) {
      params["release_date.lte"] = releaseDateTo.format("YYYY-MM-DD");
    }

    onApplyFilters(params);
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setValue([0, 10]);
    setSortValue("popularity.desc");
    setReleaseDateFrom(null);
    setReleaseDateTo(null);
    onClearFilters();
  };

  return (
    <>
      <Accordion
        square={true}
        className="w-full rounded-xl h-fit"
        sx={{ backgroundColor: "primary.main", border: "0" }}
      >
        <AccordionSummary expandIcon={<ArrowDropDownIcon color={"info"} />}>
          <Typography
            component="div"
            variant="caption"
            sx={{ color: "white", fontWeight: "bold", fontSize: { sm: "0.75rem", md: "1.25rem" } }}
            className="font-mono"
          >
            Sort
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: "white", padding: 0, paddingX: "5px" }} className="rounded-b-xl">
          <Stack direction={"column"}>
            <Typography variant="caption" className="pl-2">
              Sort Results By
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className="pl-3">
              <Select
                value={sortValue}
                onChange={handleSortChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                variant={"outlined"}
                MenuProps={{ style: { maxHeight: "300px" } }}
              >
                <MenuItem value="popularity.desc">Popularity Descending</MenuItem>
                <MenuItem value="popularity.asc">Popularity Ascending</MenuItem>
                <MenuItem value="vote_average.desc">Rating Descending</MenuItem>
                <MenuItem value="vote_average.asc">Rating Ascending</MenuItem>
                <MenuItem value="primary_release_date.desc">Release Date Descending</MenuItem>
                <MenuItem value="primary_release_date.asc">Release Date Ascending</MenuItem>
                <MenuItem value="title.asc">Title (A-Z)</MenuItem>
                <MenuItem value="title.desc">Title (Z-A)</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion
        square={true}
        className="w-full rounded-xl h-fit mt-2"
        sx={{ backgroundColor: "primary.main", border: "0" }}
      >
        <AccordionSummary expandIcon={<ArrowDropDownIcon color={"info"} />}>
          <Typography
            component="div"
            variant="caption"
            sx={{ color: "white", fontWeight: "bold", fontSize: { sm: "0.75rem", md: "1.25rem" } }}
            className="font-mono"
          >
            Filters
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{ backgroundColor: "white", padding: 0, paddingX: "5px", paddingBottom: "5px" }}
          className="rounded-b-xl"
        >
          <Stack direction={"column"}>
            <Typography variant="caption" className="pl-2 pt-2">
              Release Dates
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className="pl-3">
              <Stack direction={"row"} sx={{ alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="subtitle1" className="ml-2">
                  from
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: "80%" }}
                    slotProps={{ textField: { size: "small" } }}
                    value={releaseDateFrom}
                    onChange={handleDateChange(setReleaseDateFrom)}
                  />
                </LocalizationProvider>
              </Stack>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className="pl-3 mt-2">
              <Stack direction={"row"} sx={{ alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="subtitle1" className="ml-2">
                  to
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: "80%" }}
                    slotProps={{ textField: { size: "small" } }}
                    value={releaseDateTo}
                    onChange={handleDateChange(setReleaseDateTo)}
                  />
                </LocalizationProvider>
              </Stack>
            </FormControl>
            <Typography variant="caption" className="pl-2 pt-2">
              Genres
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {genres.map((genre) => (
                <Chip
                  key={genre.tmdb_id}
                  label={genre.name}
                  clickable
                  onClick={() => handleChipClick(genre.tmdb_id)}
                  color={selectedGenres.includes(genre.tmdb_id) ? "primary" : "default"}
                  style={{ margin: "4px" }}
                />
              ))}
            </Stack>
            <Typography variant="caption" className="pl-2 pt-3">
              User Score
            </Typography>
            <Box sx={{ m: 1, minWidth: 120 }} className="pl-3">
              <Slider
                min={0}
                max={10}
                step={1}
                marks={marks}
                getAriaLabel={() => "User Score"}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
              />
            </Box>
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Box className="pt-2 rounded-xl pb-10">
        <Button
          variant="contained"
          color="primary"
          className="w-full"
          onClick={clearFilters}
          sx={{ borderRadius: "0.75rem" }}
        >
          Clear Filters
        </Button>
      </Box>
    </>
  );
};

export default FilterOptions;
