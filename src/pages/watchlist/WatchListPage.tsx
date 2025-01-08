import { Button, Skeleton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import path from "../../routes/path";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import watchlistApi from "../../api/base/watchlist.api";
import { IWatchList } from "../../types/watchlist.type";
import { getTimeFromNow } from "../../utils/dateFormat";
import dynamicPath from "../../routes/dynamicPath";

const WatchListPage = () => {
  const navigate = useNavigate();
  const [watchLists, setWatchLists] = React.useState<IWatchList[] | null>(null);

  const getAllWatchListQuery = useQuery({
    queryKey: ["all-watch-list"],
    queryFn: async () => {
      const response: IWatchList[] = await watchlistApi.getAllWatchlist();
      setWatchLists(response);
      return response;
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <Typography variant="h5">Danh sách của tôi</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate(`${path.WATCHLIST}/${path.NEW}`)}>
          Tạo danh sách
        </Button>
      </div>

      {getAllWatchListQuery.isLoading || getAllWatchListQuery.isFetching ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
          {Array.from(new Array(2)).map((_, idx) => (
            <Skeleton variant="rounded" width={"100%"} height={300} key={idx} />
          ))}
        </div>
      ) : (
        <>
          {watchLists && watchLists?.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
                {watchLists.map((watchList) => (
                  <div key={watchList.id} className="bg-default-movie bg-no-repeat bg-cover bg-center relative">
                    <div className="rounded-lg bg-[#032541] text-white p-10 flex flex-col items-center justify-center gap-4 opacity-80 h-[280px] sm:h-[350px]">
                      <Link to={dynamicPath.WATCHLIST_DETAIL(watchList.id)}>
                        <Typography variant="h5" className="italic">
                          {watchList.name}
                        </Typography>
                      </Link>
                      <div className="flex gap-1 flex-col items-center">
                        <div className="flex items-center gap-5">
                          <div className="font-bold italic">
                            {watchList.movieIDs.length}
                            &nbsp;
                            {watchList.movieIDs.length !== 1 ? "items" : "item"}
                          </div>
                          <div className="uppercase font-semibold bg-gray-500/50 backdrop-blur-lg px-2 py-0.5 rounded-md">
                            {watchList.isPublic ? "Public" : "Private"}
                          </div>
                        </div>
                        <div className="text-gray-400 font-medium">{getTimeFromNow(watchList.updatedAt)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="mt-2 text-xl">Bạn chưa tạo danh sách nào.</div>
          )}
        </>
      )}
    </div>
  );
};

export default WatchListPage;
