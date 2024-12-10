import DocumentMeta from "react-document-meta";
import HomeHeader from "../components/home/HomeHeader.tsx";
import Trending from "../components/home/Trending.tsx";
import metadata from "../utils/metadata/index.ts";

const HomePage = () => {
  return (
    <DocumentMeta {...metadata.homeMeta}>
      <HomeHeader />
      <Trending />
    </DocumentMeta>
  );
};

export default HomePage;
