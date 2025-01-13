import { PersonDetail } from "../../types/person.type.ts";
import PersonSearchCard from "../person/PersonSearchCard.tsx";

const SearchPeopleList = ({ people }: { people: PersonDetail[] }) => {
  return (
    <div className="w-full flex flex-wrap justify-center">
      {people.length > 0 ? (
        people.map((person) => <PersonSearchCard key={person.id + person.name} person={person} />)
      ) : (
        <p className="mb-5 min-h-60">No people found. Please try a different search.</p>
      )}
    </div>
  );
};

export default SearchPeopleList;
