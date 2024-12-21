import { PersonDetail } from "../../types/person.type";
import { Grid, Typography } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { tmdbConfig } from "../../api/tmdb/tmdb-client";
import BiographyText from "../common/BiographyText";
import PersonalInfo from "./PersonalInfo";

type Props = {
  person: PersonDetail;
};

const PersonCardInfor = ({ person }: Props) => {
  return (
    <Grid container justifyContent="center" padding={{ xs: 2, md: 3 }}>
      {/* Left */}
      <Grid item xs={12} md={4} lg={3} padding={3}>
        {/* Image */}
        <LazyLoadImage
          alt={person.name}
          src={person?.profile_path ? `${tmdbConfig.imageW500URL}${person?.profile_path}` : tmdbConfig.defaultCastImg}
          wrapperProps={{
            style: { transitionDelay: "1s" },
          }}
          className="rounded-lg shadow-lg"
        />
        {/* Personal Info */}
        <PersonalInfo person={person} />
      </Grid>
      {/* Right */}
      <Grid item xs={12} md={8} lg={9} padding={{ xs: 0, md: 2 }}>
        {/* Name */}
        <Typography variant="h4" fontWeight={"bold"}>
          {person.name}
        </Typography>
        {/* biography */}
        <div className="mt-5">
          <div className="font-medium text-xl">Tiểu sử</div>
          {person?.biography ? (
            <BiographyText text={person.biography.replace(/\n/g, "<br />")} />
          ) : (
            <div>{`We don't have a biography for ${person.name}`}</div>
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default PersonCardInfor;
