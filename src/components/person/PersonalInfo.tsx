import { Typography } from "@mui/material";
import { PersonDetail } from "../../types/person.type";
import { showGenderText } from "../../utils/helper";
import { formatBirthDate, getAge } from "../../utils/dateFormat";

type Props = {
  person: PersonDetail;
};

const PersonalInfo = ({ person }: Props) => {
  return (
    <div>
      <Typography variant="h6" fontWeight={"bold"} marginTop={2}>
        Personal Info
      </Typography>
      <div className="flex flex-col gap-7 mt-2">
        <div>
          <Typography variant="body1" fontWeight={"bold"}>
            Known For
          </Typography>
          <Typography variant="body1">{person.known_for_department}</Typography>
        </div>
        <div>
          <Typography variant="body1" fontWeight={"bold"}>
            Gender
          </Typography>
          <Typography variant="body1">{showGenderText(person.gender)}</Typography>
        </div>
        {person.birthday && (
          <>
            <div>
              <Typography variant="body1" fontWeight={"bold"}>
                Birthday
              </Typography>
              <Typography variant="body1">
                {person.deathday
                  ? formatBirthDate(person.birthday)
                  : formatBirthDate(person.birthday) + " " + getAge(person.birthday)}
              </Typography>
            </div>
            {person.deathday && (
              <div>
                <Typography variant="body1" fontWeight={"bold"}>
                  Day of Death
                </Typography>
                <Typography variant="body1">
                  {formatBirthDate(person.deathday) + " " + getAge(person.birthday, person.deathday)}
                </Typography>
              </div>
            )}
          </>
        )}
        <div>
          <Typography variant="body1" fontWeight={"bold"}>
            Place of Birth
          </Typography>
          <Typography variant="body1">{person.place_of_birth}</Typography>
        </div>
        <div>
          <Typography variant="body1" fontWeight={"bold"}>
            Also Known As
          </Typography>
          <div className="flex flex-col gap-0.5">
            {person.also_known_as.map((name, index) => (
              <Typography key={index} variant="body1">
                {name}
              </Typography>
            ))}
            {person.also_known_as.length === 0 && <Typography variant="body1"> -</Typography>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
