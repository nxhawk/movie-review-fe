import DocumentMeta from "react-document-meta";
import metadata from "../utils/metadata";

const MovieDetailsPage = () => {
  return (
    <DocumentMeta {...metadata.movieDetailsMeta}>
      <div>MovieDetailsPage</div>;
    </DocumentMeta>
  );
};

export default MovieDetailsPage;
