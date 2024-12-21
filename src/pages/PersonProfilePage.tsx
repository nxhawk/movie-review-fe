import React from "react";
import DocumentMeta from "react-document-meta";
import metadata from "../utils/metadata";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import personApi from "../api/tmdb/person.api";
import { PersonDetail } from "../types/person.type";
import ResouceNotFound from "../components/common/ResouceNotFound";
import { Box, CircularProgress } from "@mui/material";
import PersonCardInfor from "../components/person/PersonCardInfor";

const PersonProfilePage = () => {
  const [person, setPerson] = React.useState<PersonDetail | null>(null);
  const { personId } = useParams();

  const getPersonDetailQuery = useQuery({
    queryKey: ["person-detail", personId],
    queryFn: async () => {
      const response: PersonDetail = await personApi.getDetails(personId!);
      metadata.personProfileMeta.title = `${response.name} - Personal Info - CineMatch`;
      setPerson(response);
      return response;
    },
    enabled: Boolean(personId),
  });

  if (getPersonDetailQuery.isError) {
    metadata.personProfileMeta.title = `Page Not Found - Personal Info - CineMatch`;
  }

  return (
    <DocumentMeta {...metadata.personProfileMeta}>
      {/* Group person information */}
      {getPersonDetailQuery.isFetching || getPersonDetailQuery.isLoading ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", paddingY: "10px", minHeight: "500px", alignItems: "center" }}
        >
          <CircularProgress />
        </Box>
      ) : person ? (
        <PersonCardInfor person={person} />
      ) : (
        <ResouceNotFound />
      )}
    </DocumentMeta>
  );
};

export default PersonProfilePage;
