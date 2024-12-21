import { Typography } from "@mui/material";
import { CrewMovie } from "../../types/actor.type";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { tmdbConfig } from "../../api/tmdb/tmdb-client";
import { groupByDepartment } from "../../utils/helper";
import { Link } from "react-router-dom";
import dynamicPath from "../../routes/dynamicPath";

type Props = {
  crews: CrewMovie[];
};
const ListCrew = ({ crews }: Props) => {
  const groupedData = groupByDepartment(
    crews.sort(function (a, b) {
      return a.department.localeCompare(b.department);
    }),
  );

  return (
    <div className="flex-1">
      {/* Header */}
      <div className="flex items-end gap-2">
        <Typography variant="h5">Crew</Typography>
        <Typography variant="h6" className="text-gray-500 font-bold">
          {crews.length}
        </Typography>
      </div>
      {/* List Crew */}
      {Object.keys(groupedData).map((department) => (
        <div key={department} className="mt-8">
          <div className="font-bold text-xl">{department}</div>
          {groupedData[department].map((crew) => (
            <div key={crew.id} className="flex items-center gap-5 my-3">
              <Link to={dynamicPath.PERSON_DETAILS(crew.id)}>
                <LazyLoadImage
                  alt={crew.name}
                  src={
                    crew.profile_path ? `${tmdbConfig.imageW500URL}/${crew.profile_path}` : tmdbConfig.defaultCastImg
                  }
                  wrapperProps={{
                    style: { transitionDelay: "1s" },
                  }}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              </Link>
              <div>
                <Link to={dynamicPath.PERSON_DETAILS(crew.id)}>
                  <Typography variant="body1" className="font-bold">
                    {crew.name}
                  </Typography>
                </Link>
                <Typography variant="body2" className="text-gray-500">
                  {crew.job}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* {crews.map((crew) => (
        <div key={crew.id} className="flex items-center gap-5 my-3">
          <LazyLoadImage
            alt={crew.name}
            src={crew.profile_path ? `${tmdbConfig.imageW500URL}/${crew.profile_path}` : tmdbConfig.defaultCastImg}
            wrapperProps={{
              style: { transitionDelay: "1s" },
            }}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <div>
            <Typography variant="body1" className="font-bold">
              {crew.name}
            </Typography>
            <Typography variant="body2" className="text-gray-500">
              {crew.job} - {crew.department}
            </Typography>
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default ListCrew;
