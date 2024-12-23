import { PersonDetail } from "../../types/person.type";
import { Grid } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { tmdbConfig } from "../../api/tmdb/tmdb-client";
import BiographyText from "../common/BiographyText";
import PersonalInfo from "./PersonalInfo";
import PersonActing from "./PersonActing";

type Props = {
  person: PersonDetail;
};

const PersonCardInfor = ({ person }: Props) => {
  return (
    <Grid container justifyContent="center" padding={{ xs: 2, md: 3 }}>
      {/* Left */}
      <Grid item xs={12} md={4} lg={3} padding={3} className="max-md:flex  gap-6 items-start">
        {/* Image */}
        <div className="flex justify-center">
          <LazyLoadImage
            alt={person.name}
            src={person?.profile_path ? `${tmdbConfig.imageW500URL}${person?.profile_path}` : tmdbConfig.defaultCastImg}
            className="rounded-lg shadow-lg"
          />
        </div>
        {/* Personal Info */}
        <PersonalInfo person={person} />
      </Grid>
      {/* Right */}
      <Grid item xs={12} md={8} lg={9} padding={{ xs: 0, md: 2 }}>
        {/* Name */}
        <h1 className="text-4xl font-bold">{person.name}</h1>
        {/* biography */}
        <div className="mt-6">
          <div className="font-medium text-xl">Tiểu sử</div>
          {person?.biography ? (
            <BiographyText text={person.biography.replace(/\n/g, "<br />")} />
          ) : (
            <div>{`We don't have a biography for ${person.name}`}</div>
          )}
        </div>
        {/* Know For And Acting */}
        <PersonActing personId={person.id} />
      </Grid>
    </Grid>
  );
};

export default PersonCardInfor;
