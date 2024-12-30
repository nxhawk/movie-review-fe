import DocumentMeta from "react-document-meta";
import ResourceNotFound from "../components/common/ResourceNotFound";
import metadata from "../utils/metadata";

const NotFoundPage = () => {
  return (
    <DocumentMeta {...metadata.notFoundMeta}>
      <ResourceNotFound />
    </DocumentMeta>
  );
};

export default NotFoundPage;
