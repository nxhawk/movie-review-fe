import * as React from "react";
import { Typography, Popover, Box } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export type FilterOptionsPersonalProps = {
  name: string;
  count: number;
};

type Props = {
  filterOptions: FilterOptionsPersonalProps[];
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
};

export default function TransitionsPopper({ filterOptions, setSelectedFilter }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <button
        aria-describedby={id}
        type="button"
        onClick={handleClick}
        className="flex items-center gap-3 hover:text-gray-600"
      >
        Department
        <ArrowDropDownIcon />
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ py: 1 }}>
          {filterOptions.map((option, idx) => (
            <div
              key={idx}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center justify-between gap-4"
              onClick={() => {
                handleClose();
                setSelectedFilter(option.name);
              }}
            >
              <Typography variant="body2">{option.name}</Typography>
              <Typography variant="body2" color="grey.600">
                {option.count}
              </Typography>
            </div>
          ))}
        </Box>
      </Popover>
    </>
  );
}
