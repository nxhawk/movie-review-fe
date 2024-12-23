import { Box, Divider, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import personApi from "../../api/tmdb/person.api";
import { ListCutCredit, MoviesOfActor } from "../../types/movie.type";
import KnowForSwiper from "./KnowForSwiper";

import CreditsList from "./CreditsList";
import KnowForSkeleton from "../skeleton/KnowForSkeleton";
import { transformToCutCreditList } from "../../utils/dataConvert";
import TransitionsPopper, { FilterOptionsPersonalProps } from "../dialog/TransitionsPopper";

type Props = {
  personId: number | string;
};

const PersonActing = ({ personId }: Props) => {
  const [credits, setCredits] = React.useState<MoviesOfActor | null>(null);
  const [groupCredits, setGroupCredits] = React.useState<ListCutCredit[] | null>(null);
  const [filterOptions, setFilterOptions] = React.useState<FilterOptionsPersonalProps[]>([]);
  const [selectedFilter, setSelectedFilter] = React.useState<string>("all");

  const getPersonCreditsQuery = useQuery({
    queryKey: ["person-detail-credits", personId],
    queryFn: async () => {
      const response: MoviesOfActor = await personApi.getCredits(personId!);
      setCredits(response);
      setGroupCredits(transformToCutCreditList(response));
      return response;
    },
    enabled: Boolean(personId),
  });

  React.useEffect(() => {
    if (!credits || !groupCredits) return;
    setFilterOptions(
      groupCredits.map((item) => {
        return { name: item.name, count: item.credits.length };
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credits]);

  return (
    <Box marginTop={5}>
      {/* Know for */}
      <div>
        <Typography variant="h6" fontWeight="bold">
          Known For
        </Typography>

        {getPersonCreditsQuery.isLoading || getPersonCreditsQuery.isFetching ? (
          <KnowForSkeleton />
        ) : (
          credits?.cast && <KnowForSwiper movies={credits.cast} />
        )}
      </div>

      {/* Credits list */}
      <Divider className="mt-3" />

      {credits && groupCredits && (
        <div className="relative">
          {/* Filter */}
          <div className="absolute mt-5 top-0 right-0 flex justify-between items-center gap-3">
            {selectedFilter !== "all" && (
              <button className="text-[#01b4ff] hover:text-[#119dda]" onClick={() => setSelectedFilter("all")}>
                Clear
              </button>
            )}
            <TransitionsPopper filterOptions={filterOptions} setSelectedFilter={setSelectedFilter} />
          </div>
          {/* Results Credits list */}
          <CreditsList
            credits={
              selectedFilter !== "all" ? groupCredits.filter((credit) => credit.name === selectedFilter) : groupCredits
            }
          />
        </div>
      )}
    </Box>
  );
};

export default PersonActing;
