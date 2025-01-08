import { Avatar, Typography, useMediaQuery } from "@mui/material";
import { IFullUser } from "../../types/user.type";
import { formatToMonthYear } from "../../utils/dateFormat";
import UserScore from "../movie/UserScore";
import { useQuery } from "@tanstack/react-query";
import ratingApi from "../../api/base/rating.api";
import React from "react";

type Props = {
  user: IFullUser;
};

type RatingResponse = {
  averageRating: number;
};

const AboutUser = ({ user }: Props) => {
  const matches = useMediaQuery("(min-width:680px)");
  const [averageRating, setAverageRating] = React.useState<number>(0);

  useQuery({
    queryKey: ["average-rating"],
    queryFn: async () => {
      const response: RatingResponse = await ratingApi.getAverageRating();
      setAverageRating(response.averageRating || 0);
      return response;
    },
  });

  return (
    <div className="flex items-center gap-5 md:gap-10 max-md:justify-center">
      <Avatar
        alt={`${user.email}`}
        style={{
          width: matches ? "150px" : "0px",
          height: matches ? "150px" : "0px",
          fontSize: matches ? "80px" : "0px",
          color: "white",
          backgroundColor: "#3f51b5",
        }}
      >
        {user.email.charAt(0).toUpperCase()}
      </Avatar>
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Avatar
            alt={`${user.email}`}
            style={{
              width: matches ? "0px" : "80px",
              height: matches ? "0px" : "80px",
              fontSize: matches ? "0px" : "50px",
              color: "white",
              backgroundColor: "#3f51b5",
            }}
          >
            {user.email.charAt(0).toUpperCase()}
          </Avatar>
          <div className="flex flex-col md:flex-row md:gap-3 md:items-end flex-wrap">
            <Typography color="white" variant="h4" fontWeight="bold">
              {user.name}
            </Typography>
            <Typography variant="body1" color="#c4c3c3" sx={{ marginBottom: "4px" }}>
              Thành viên kể từ {formatToMonthYear(user.createdAt)}
            </Typography>
          </div>
        </div>
        <div className="flex items-center gap-3 max-md:ml-10">
          <UserScore point={averageRating} size="large" />
          <div className="text-white font-medium text-base">
            <div>Trung bình</div>
            <div>Điểm phim</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUser;
