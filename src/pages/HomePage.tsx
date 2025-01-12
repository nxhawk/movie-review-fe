import DocumentMeta from "react-document-meta";
import HomeHeader from "../components/home/HomeHeader.tsx";
import Trending from "../components/home/Trending.tsx";
import metadata from "../utils/metadata/index.ts";
import LatestTrailer from "../components/home/LatestTrailer.tsx";

const HomePage = () => {
  return (
    <DocumentMeta {...metadata.homeMeta}>
      <HomeHeader />
      <Trending />
      <LatestTrailer />
    </DocumentMeta>
  );
};

export default HomePage;
