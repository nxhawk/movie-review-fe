import ViewStreamIcon from "@mui/icons-material/ViewStream";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import React from "react";
import { GlobalContext } from "../../contexts/GlobalContext";

const ButtonChangeStyleView = () => {
  const { isGridView, setIsGridView } = React.useContext(GlobalContext)!;

  return (
    <button
      className="px-2 py-1 rounded-full border border-solid border-slate-500 md:px-4 font-semibold"
      onClick={() => setIsGridView(!isGridView)}
    >
      {isGridView ? (
        <div className="flex items-center gap-2">
          Use List View <ViewStreamIcon />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          Use Grid View <ViewWeekIcon />
        </div>
      )}
    </button>
  );
};

export default ButtonChangeStyleView;
