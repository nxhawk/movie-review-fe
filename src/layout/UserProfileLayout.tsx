import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { IFullUser } from "../types/user.type";
import path from "../routes/path";
import DocumentMeta from "react-document-meta";
import metadata from "../utils/metadata";
import toast from "react-hot-toast";
import authApi from "../api/base/auth.api";
import { useQuery } from "@tanstack/react-query";
import AboutUser from "../components/profile/AboutUser";
import { cn } from "../utils/cn";

const UserProfileLayout = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<IFullUser | null>(null);

  const getMeQuery = useQuery({
    queryKey: ["profile"],
    queryFn: authApi.profile,
    gcTime: 0,
  });

  React.useEffect(() => {
    if (getMeQuery.isSuccess) {
      const profile: IFullUser = getMeQuery.data;
      setUser(profile);
      metadata.profileMeta.title = `${profile.name} - Profile Page`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getMeQuery.isSuccess]);

  React.useEffect(() => {
    if (getMeQuery.isError) {
      toast.error("AcessToken has expired");
      navigate(path.LOGIN, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getMeQuery.isError]);

  return (
    <DocumentMeta {...metadata.profileMeta}>
      {/* User information */}
      <div className="bg-center bg-cover w-full relative">
        <div className="block w-full gradient relative">
          <div className="bg-[url('src/assets/images/user-background.svg')] bg-transparent bg-no-repeat bg-cover inner_content top-0 left-0">
            <div className="p-10">{user && <AboutUser user={user} />}</div>
          </div>
        </div>
      </div>
      {/* navigate watchlist, favoritelist, rating */}
      <div className="mt-2 text-base sm:text-xl flex justify-center gap-8 sm:gap-[4rem] py-2 border-y border-dashed border-gray-400 mb-3 sm:mb-6 font-serif">
        <NavLink
          to={path.WATCHLIST}
          className={({ isActive }) => cn(isActive ? "text-blue-500 border-b-2 border-blue-500 relative" : "")}
        >
          Watchlist
        </NavLink>
        <NavLink
          to={path.FAVORITE}
          className={({ isActive }) => cn(isActive ? "text-blue-500 border-b-2 border-blue-500" : "")}
        >
          Favorite list
        </NavLink>
        <NavLink
          to={path.RATING}
          className={({ isActive }) => cn(isActive ? "text-blue-500 border-b-2 border-blue-500" : "")}
        >
          Rating
        </NavLink>
      </div>
      {/* content */}
      <div className="px-2 sm:px-10 min-h-[200px]">
        <Outlet />
      </div>
    </DocumentMeta>
  );
};

export default UserProfileLayout;
